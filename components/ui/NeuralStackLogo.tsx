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
};

type NeuralStackLogoProps = {
  size?: number;
  interactive?: boolean;
  animate?: boolean;
  density?: Density;
  showLabels?: boolean;
};

function planePolygon(cx: number, cy: number, halfWidth: number, halfHeight: number) {
  return `${cx - halfWidth},${cy} ${cx},${cy - halfHeight} ${cx + halfWidth},${cy} ${cx},${cy + halfHeight}`;
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
  const gapScaleByDensity: Record<Density, number> = {
    low: 0.198,
    medium: 0.202,
    high: 0.205,
    extreme: 0.21
  };
  const gapY = size * gapScaleByDensity[density];

  const layers = useMemo<LayerGeometry[]>(() => {
    const base = [
      { label: "INTERFACE", scale: 0.79 },
      { label: "ADDRESS", scale: 0.89 },
      { label: "CITY", scale: 0.99 },
      { label: "EARTH", scale: 1.09 }
    ];

    return base.map((layer, index) => {
      const centerY = topY + index * gapY;

      return {
        label: layer.label,
        centerX,
        centerY,
        halfWidth: size * 0.265 * layer.scale,
        halfHeight: size * 0.082 * layer.scale
      };
    });
  }, [centerX, gapY, size, topY]);

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
              fill="rgba(8, 9, 11, 0.015)"
              stroke="rgba(8, 9, 11, 0.86)"
              strokeWidth={highlighted ? 1.2 : 1.05}
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
