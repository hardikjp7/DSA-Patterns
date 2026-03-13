import React from "react";

const INTERVALS = [
  { start: 1, end: 3, label: "[1,3]" },
  { start: 2, end: 6, label: "[2,6]" },
  { start: 8, end: 10, label: "[8,10]" },
  { start: 15, end: 18, label: "[15,18]" },
];

const MERGED = [
  { start: 1, end: 6, label: "[1,6]", color: "hsl(var(--primary))" },
  { start: 8, end: 10, label: "[8,10]", color: "#f59e0b" },
  { start: 15, end: 18, label: "[15,18]", color: "#10b981" },
];

const SCALE_MIN = 0;
const SCALE_MAX = 20;

function toX(val: number, width: number) {
  return ((val - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * width;
}

export default function IntervalsVisualization() {
  const [step, setStep] = React.useState(0);
  const maxStep = 4;
  const W = 340;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (maxStep + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground text-center">Merge Overlapping Intervals</p>

      {/* Original intervals */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Original intervals (sorted by start):</p>
        <svg width={W} height={80} className="w-full max-w-[340px] mx-auto block">
          {INTERVALS.map((iv, i) => {
            const x1 = toX(iv.start, W);
            const x2 = toX(iv.end, W);
            const isActive = i <= step - 1;
            return (
              <g key={i}>
                <rect
                  x={x1}
                  y={10 + i * 15}
                  width={x2 - x1}
                  height={12}
                  rx="3"
                  fill={isActive ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  opacity={isActive ? 1 : 0.5}
                  className="transition-all duration-300"
                />
                <text x={x1} y={10 + i * 15 - 1} fontSize="9" fill="hsl(var(--muted-foreground))">
                  {iv.label}
                </text>
              </g>
            );
          })}
          {/* Scale */}
          {[0, 5, 10, 15, 20].map((v) => (
            <g key={v}>
              <line x1={toX(v, W)} y1={70} x2={toX(v, W)} y2={76} stroke="hsl(var(--border))" />
              <text x={toX(v, W) - 3} y={79} fontSize="8" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}
          <line x1={0} y1={70} x2={W} y2={70} stroke="hsl(var(--border))" />
        </svg>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">↓ merge overlapping</span>
        </div>
      </div>

      {/* Merged result */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Merged result:</p>
        <svg width={W} height={50} className="w-full max-w-[340px] mx-auto block">
          {MERGED.map((iv, i) => {
            const x1 = toX(iv.start, W);
            const x2 = toX(iv.end, W);
            return (
              <g key={i}>
                <rect
                  x={x1}
                  y={8}
                  width={x2 - x1}
                  height={16}
                  rx="4"
                  fill={iv.color}
                  opacity={0.9}
                />
                <text x={(x1 + x2) / 2} y={20} textAnchor="middle" fontSize="9" fill="white" fontWeight="600">
                  {iv.label}
                </text>
              </g>
            );
          })}
          {[0, 5, 10, 15, 20].map((v) => (
            <g key={v}>
              <line x1={toX(v, W)} y1={30} x2={toX(v, W)} y2={36} stroke="hsl(var(--border))" />
              <text x={toX(v, W) - 3} y={45} fontSize="8" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}
          <line x1={0} y1={30} x2={W} y2={30} stroke="hsl(var(--border))" />
        </svg>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        [1,3] and [2,6] overlap → merged to <span className="text-primary font-bold">[1,6]</span>
      </div>
    </div>
  );
}
