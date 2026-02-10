"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type Density = "low" | "medium" | "high" | "extreme";

type LayerGeometry = {
  label: string;
  centerX: number;
  centerY: number;
  halfWidth: number;
  halfHeight: number;
  gridDivisions: number;
};

type Route = {
  points: Array<{ x: number; y: number }>;
  phase: number;
};

type NeuralStackLogoProps = {
  size?: number;
  interactive?: boolean;
  animate?: boolean;
  density?: Density;
  showLabels?: boolean;
};

const ROUTE_COUNTS: Record<Density, number> = {
  low: 8,
  medium: 14,
  high: 20,
  extreme: 28
};

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function clampToDiamond(
  centerX: number,
  centerY: number,
  halfWidth: number,
  halfHeight: number,
  x: number,
  y: number
) {
  const nx = (x - centerX) / halfWidth;
  const ny = (y - centerY) / halfHeight;
  const norm = Math.abs(nx) + Math.abs(ny);

  if (norm <= 1) {
    return { x, y };
  }

  const scale = 1 / norm;
  return {
    x: centerX + nx * halfWidth * scale,
    y: centerY + ny * halfHeight * scale
  };
}

function gridPath(cx: number, cy: number, halfWidth: number, halfHeight: number, divisions: number) {
  const left = cx - halfWidth;
  const commands: string[] = [];

  for (let i = 0; i <= divisions; i += 1) {
    const t = i / divisions;
    commands.push(
      `M${left + t * halfWidth},${cy - t * halfHeight} L${left + t * halfWidth + halfWidth},${
        cy - t * halfHeight + halfHeight
      }`
    );
    commands.push(
      `M${left + t * halfWidth},${cy + t * halfHeight} L${left + t * halfWidth + halfWidth},${
        cy + t * halfHeight - halfHeight
      }`
    );
  }

  return commands.join(" ");
}

function planePolygon(cx: number, cy: number, halfWidth: number, halfHeight: number) {
  return `${cx - halfWidth},${cy} ${cx},${cy - halfHeight} ${cx + halfWidth},${cy} ${cx},${cy + halfHeight}`;
}

function generateRoutes(layers: LayerGeometry[], count: number, seed: number) {
  const random = seededRandom(seed);
  const routes: Route[] = [];

  for (let routeIndex = 0; routeIndex < count; routeIndex += 1) {
    const base = (random() - 0.5) * 1.35;
    const drift = (random() - 0.5) * 0.24;

    const points = layers.map((layer, layerIndex) => {
      const nx = base + drift * layerIndex + (random() - 0.5) * 0.16;
      const ny = (random() - 0.5) * (0.46 - layerIndex * 0.06);

      return clampToDiamond(
        layer.centerX,
        layer.centerY,
        layer.halfWidth,
        layer.halfHeight,
        layer.centerX + nx * layer.halfWidth,
        layer.centerY + ny * layer.halfHeight
      );
    });

    routes.push({
      points,
      phase: random() * Math.PI * 2
    });
  }

  return routes;
}

export function NeuralStackLogo({
  size = 160,
  interactive = true,
  animate = true,
  density = "high",
  showLabels = false
}: NeuralStackLogoProps) {
  const [hoverLayer, setHoverLayer] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [clock, setClock] = useState(0);

  useEffect(() => {
    if (!animate) {
      return;
    }

    let frame = 0;
    const tick = (ts: number) => {
      setClock(ts / 1000);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const centerX = size / 2;
  const topY = size * 0.16;
  const gapY = size * 0.205;

  const layers = useMemo<LayerGeometry[]>(() => {
    const base = [
      { label: "INTERFACE", scale: 0.79, gridDivisions: 5 },
      { label: "ADDRESS", scale: 0.89, gridDivisions: 6 },
      { label: "CITY", scale: 0.99, gridDivisions: 7 },
      { label: "EARTH", scale: 1.09, gridDivisions: 8 }
    ];

    return base.map((layer, index) => {
      const centerY = topY + index * gapY;

      return {
        label: layer.label,
        centerX,
        centerY,
        halfWidth: size * 0.265 * layer.scale,
        halfHeight: size * 0.082 * layer.scale,
        gridDivisions: layer.gridDivisions
      };
    });
  }, [centerX, gapY, size, topY]);

  const routes = useMemo(
    () => generateRoutes(layers, ROUTE_COUNTS[density], 9077 + size),
    [density, layers, size]
  );

  function layerShift(layerIndex: number) {
    const hoverLift =
      hoverLayer === null ? 0 : hoverLayer === layerIndex ? -size * 0.01 : size * 0.003;
    const parallaxX = interactive ? pointer.x * size * (0.0032 + layerIndex * 0.0011) : 0;
    const parallaxY = interactive ? pointer.y * size * (0.0035 + layerIndex * 0.0013) : 0;
    const breathe = animate ? Math.sin(clock * 1.25 + layerIndex * 0.8) * size * 0.0018 : 0;

    return {
      x: parallaxX,
      y: hoverLift + parallaxY + breathe
    };
  }

  function onPointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (!interactive) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x, y });
  }

  function onPointerLeave() {
    setHoverLayer(null);
    setPointer({ x: 0, y: 0 });
  }

  const tiltStyle: CSSProperties | undefined = interactive
    ? {
        transform: `perspective(760px) rotateX(${(-pointer.y * 3.8).toFixed(2)}deg) rotateY(${(
          pointer.x * 3.8
        ).toFixed(2)}deg)`
      }
    : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="title-neural-logo"
      style={tiltStyle}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      {routes.map((route, routeIndex) => {
        const points = route.points
          .map((point, pointIndex) => {
            const shift = layerShift(pointIndex);
            return `${point.x + shift.x},${point.y + shift.y}`;
          })
          .join(" ");

        const pulse = animate ? 0.2 + Math.sin(clock * 1.6 + route.phase) * 0.08 : 0.2;

        return (
          <polyline
            key={`route-${routeIndex}`}
            points={points}
            fill="none"
            stroke="rgba(12, 13, 16, 0.55)"
            strokeWidth={hoverLayer === null ? 0.8 : 1.05}
            opacity={Number(Math.max(0.12, pulse).toFixed(4))}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );
      })}

      {layers.map((layer, layerIndex) => {
        const shift = layerShift(layerIndex);
        const cx = layer.centerX + shift.x;
        const cy = layer.centerY + shift.y;
        const highlighted = hoverLayer === layerIndex;

        return (
          <g
            key={layer.label}
            onPointerEnter={() => interactive && setHoverLayer(layerIndex)}
            style={{ cursor: interactive ? "pointer" : "default" }}
          >
            <polygon
              points={planePolygon(cx, cy, layer.halfWidth, layer.halfHeight)}
              fill="transparent"
              stroke="rgba(8, 9, 11, 0.86)"
              strokeWidth={highlighted ? 1.2 : 1.05}
            />

            <path
              d={gridPath(cx, cy, layer.halfWidth, layer.halfHeight, layer.gridDivisions)}
              fill="none"
              stroke="rgba(22, 24, 28, 0.35)"
              strokeWidth={0.42}
              opacity={highlighted ? 0.9 : 0.74}
            />

            {showLabels ? (
              <text
                x={cx + layer.halfWidth + size * 0.03}
                y={cy + 2}
                fill="rgba(18, 19, 22, 0.78)"
                fontSize={size * 0.055}
                fontFamily="var(--font-data)"
                letterSpacing="1.4"
              >
                {layer.label}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
