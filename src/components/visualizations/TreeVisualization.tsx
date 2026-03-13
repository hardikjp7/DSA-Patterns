import React from "react";

interface TreeNodeData {
  val: number;
  left?: TreeNodeData | null;
  right?: TreeNodeData | null;
}

interface TreeVizProps {
  type: "bfs" | "dfs-path" | "subsets";
}

const SAMPLE_TREE: TreeNodeData = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: { val: 7, left: null, right: null },
      right: { val: 2, left: null, right: null },
    },
    right: null,
  },
  right: {
    val: 8,
    left: { val: 13, left: null, right: null },
    right: {
      val: 4,
      left: null,
      right: { val: 1, left: null, right: null },
    },
  },
};

interface NodePosition {
  node: TreeNodeData;
  x: number;
  y: number;
  id: string;
  parent?: NodePosition;
}

function computePositions(
  node: TreeNodeData | null | undefined,
  x: number,
  y: number,
  spread: number,
  positions: NodePosition[],
  parent?: NodePosition
): void {
  if (!node) return;
  const id = `${node.val}-${x}-${y}`;
  const pos: NodePosition = { node, x, y, id, parent };
  positions.push(pos);
  const childSpread = spread / 2;
  computePositions(node.left, x - spread, y + 72, childSpread, positions, pos);
  computePositions(node.right, x + spread, y + 72, childSpread, positions, pos);
}

const BFS_ORDER = [5, 4, 8, 11, 13, 4, 7, 2, 1];
const PATH_SUM_NODES = [5, 4, 11, 2]; // path 5->4->11->2 = 22

export default function TreeVisualization({ type }: TreeVizProps) {
  const [step, setStep] = React.useState(0);

  const sequence = type === "bfs" ? BFS_ORDER : PATH_SUM_NODES;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 1));
    }, 700);
    return () => clearInterval(timer);
  }, [sequence.length]);

  const positions: NodePosition[] = [];
  computePositions(SAMPLE_TREE, 200, 36, 88, positions);

  const visitedVals = new Set(sequence.slice(0, step));

  const edges: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
  positions.forEach((pos) => {
    if (pos.parent) {
      edges.push({
        x1: pos.parent.x,
        y1: pos.parent.y,
        x2: pos.x,
        y2: pos.y,
        id: `${pos.parent.id}-${pos.id}`,
      });
    }
  });

  const currentVal = sequence[step - 1];

  return (
    <div className="w-full overflow-x-auto">
      <div className="text-center text-xs text-muted-foreground mb-2">
        {type === "bfs"
          ? `BFS Level-Order — visiting node: ${currentVal ?? "..."}`
          : `DFS Path Sum (target=22) — path: ${sequence.slice(0, step).join(" → ") || "start"}`}
      </div>
      <svg width="400" height="270" viewBox="0 0 400 270" className="mx-auto block">
        {/* Edges */}
        {edges.map((e) => (
          <line
            key={e.id}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
          />
        ))}
        {/* Nodes */}
        {positions.map((pos) => {
          const isVisited = visitedVals.has(pos.node.val);
          const isCurrent = pos.node.val === currentVal;
          return (
            <g key={pos.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="19"
                fill={
                  isCurrent
                    ? "#f59e0b"
                    : isVisited
                    ? "hsl(var(--primary))"
                    : "hsl(var(--card))"
                }
                stroke={
                  isCurrent
                    ? "#f59e0b"
                    : isVisited
                    ? "hsl(var(--primary))"
                    : "hsl(var(--border))"
                }
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={isVisited || isCurrent ? "white" : "hsl(var(--foreground))"}
                className="transition-all duration-300"
              >
                {pos.node.val}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
          Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-primary"></span>
          Visited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full border border-border bg-card"></span>
          Unvisited
        </span>
      </div>
    </div>
  );
}
