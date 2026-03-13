import React from "react";

const GRID = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"],
];

const ISLAND_COLORS = ["hsl(var(--primary))", "#f59e0b", "#10b981"];

function getIslandId(r: number, c: number, grid: string[][]): number {
  if (r === 0 && c === 0) return 0;
  if (r === 0 && c === 1) return 0;
  if (r === 1 && c === 0) return 0;
  if (r === 1 && c === 1) return 0;
  if (r === 2 && c === 2) return 1;
  if (r === 3 && c === 3) return 2;
  if (r === 3 && c === 4) return 2;
  return -1;
}

export default function GraphVisualization() {
  const [visitedCells, setVisitedCells] = React.useState<Set<string>>(new Set());
  const [step, setStep] = React.useState(0);

  const islandCells = [
    ["0,0","0,1","1,0","1,1"],
    ["2,2"],
    ["3,3","3,4"],
  ];

  React.useEffect(() => {
    const allCells = islandCells.flat();
    const timer = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next > allCells.length) {
          setVisitedCells(new Set());
          return 0;
        }
        setVisitedCells(new Set(allCells.slice(0, next)));
        return next;
      });
    }, 350);
    return () => clearInterval(timer);
  }, []);

  const currentIsland = step <= 4 ? 0 : step <= 5 ? 1 : 2;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">
        DFS flood fill — discovering <span className="text-primary font-semibold">3 islands</span>
      </p>
      <div className="flex justify-center">
        <div className="inline-grid gap-1" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {GRID.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r},${c}`;
              const isVisited = visitedCells.has(key);
              const islandId = getIslandId(r, c, GRID);
              return (
                <div
                  key={key}
                  className={`w-12 h-12 rounded flex items-center justify-center font-bold text-lg border-2 transition-all duration-200 ${
                    cell === "0"
                      ? "bg-blue-950/50 border-blue-900/50 text-blue-400"
                      : isVisited
                      ? "border-white/20 scale-105 text-white"
                      : "bg-card border-border text-foreground"
                  }`}
                  style={
                    cell === "1" && isVisited && islandId >= 0
                      ? { backgroundColor: ISLAND_COLORS[islandId], borderColor: ISLAND_COLORS[islandId] }
                      : {}
                  }
                >
                  {cell === "0" ? "~" : cell}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="flex justify-center gap-3 text-xs">
        {ISLAND_COLORS.map((color, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: color }}></span>
            Island {i + 1}
          </span>
        ))}
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-900/60 border border-blue-700"></span>
          Water
        </span>
      </div>
    </div>
  );
}
