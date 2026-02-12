#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PID_FILE="$ROOT_DIR/.tmp_frontend.pid"
LOG_FILE="$ROOT_DIR/.dev.log"
HOST="127.0.0.1"
PORT="3000"
SHORT_URL="http://$HOST:$PORT/deck-react-short"
INTERNAL_URL="http://$HOST:$PORT/deck-react-short-internal"

is_listening() {
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1
}

listener_pid() {
  lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1
}

pid_running() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [[ -n "$pid" ]] && ps -p "$pid" >/dev/null 2>&1; then
      return 0
    fi
  fi
  return 1
}

pid_matches_listener() {
  if [[ ! -f "$PID_FILE" ]]; then
    return 1
  fi

  local file_pid live_pid
  file_pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  live_pid="$(listener_pid || true)"
  [[ -n "$file_pid" ]] && [[ -n "$live_pid" ]] && [[ "$file_pid" == "$live_pid" ]]
}

reconcile_pid_file() {
  local live_pid
  live_pid="$(listener_pid || true)"
  if [[ -n "$live_pid" ]]; then
    echo "$live_pid" > "$PID_FILE"
  fi
}

http_ok() {
  local url="$1"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" "$url" || true)"
  [[ "$code" == "200" ]]
}

has_runtime_error() {
  local url="$1"
  local body
  body="$(curl -s "$url" || true)"
  if echo "$body" | rg -q '"statusCode":500|Cannot find module|Internal Server Error'; then
    return 0
  fi
  return 1
}

stop_server() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [[ -n "$pid" ]] && ps -p "$pid" >/dev/null 2>&1; then
      kill "$pid" >/dev/null 2>&1 || true
      sleep 0.8
    fi
  fi

  local pids
  pids="$(lsof -tiTCP:$PORT -sTCP:LISTEN || true)"
  if [[ -n "$pids" ]]; then
    kill $pids >/dev/null 2>&1 || true
    sleep 0.8
  fi

  rm -f "$PID_FILE"
}

start_server() {
  if is_listening && http_ok "$SHORT_URL" && http_ok "$INTERNAL_URL" && ! has_runtime_error "$SHORT_URL" && ! has_runtime_error "$INTERNAL_URL"; then
    reconcile_pid_file
    echo "dev server already healthy on $HOST:$PORT"
    status_server
    return 0
  fi

  stop_server

  # Prevent stale chunk/runtime mismatches.
  rm -rf "$ROOT_DIR/.next"

  nohup /bin/zsh -lc "cd '$ROOT_DIR' && npm run dev -- --hostname $HOST --port $PORT" >"$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"

  for _ in {1..30}; do
    if is_listening; then
      break
    fi
    sleep 1
  done

  if ! is_listening; then
    echo "failed to start dev server"
    tail -n 60 "$LOG_FILE" || true
    return 1
  fi

  # Warm routes so Next compiles them once.
  curl -s "$SHORT_URL" >/dev/null || true
  curl -s "$INTERNAL_URL" >/dev/null || true

  echo "dev server started"
  status_server
}

status_server() {
  echo "pid file: $(cat "$PID_FILE" 2>/dev/null || echo none)"
  echo "listener:"
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN || true
  if is_listening && ! pid_matches_listener; then
    echo "note: pid file was stale; reconciling to active listener"
    reconcile_pid_file
    echo "pid file (updated): $(cat "$PID_FILE" 2>/dev/null || echo none)"
  fi

  local s1 s2
  s1="$(curl -s -o /dev/null -w "%{http_code}" "$SHORT_URL" || true)"
  s2="$(curl -s -o /dev/null -w "%{http_code}" "$INTERNAL_URL" || true)"
  echo "health: $SHORT_URL -> $s1"
  echo "health: $INTERNAL_URL -> $s2"
}

doctor_server() {
  local bad=0

  if ! is_listening; then
    echo "doctor: listener check failed"
    bad=1
  fi

  if ! http_ok "$SHORT_URL" || ! http_ok "$INTERNAL_URL"; then
    echo "doctor: non-200 response detected"
    bad=1
  fi

  if has_runtime_error "$SHORT_URL" || has_runtime_error "$INTERNAL_URL"; then
    echo "doctor: runtime error signature detected"
    bad=1
  fi

  if [[ "$bad" -eq 1 ]]; then
    echo "doctor: repairing by full restart"
    restart_server
    return 0
  fi

  reconcile_pid_file
  echo "doctor: healthy"
  status_server
}

restart_server() {
  stop_server
  start_server
}

usage() {
  echo "usage: $0 {start|stop|restart|status|doctor}"
}

cmd="${1:-}"
case "$cmd" in
  start) start_server ;;
  stop) stop_server ;;
  restart) restart_server ;;
  status) status_server ;;
  doctor) doctor_server ;;
  *) usage; exit 1 ;;
esac
