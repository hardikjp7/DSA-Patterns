import React from "react";

interface HeapVizProps {
  type: "two-heaps" | "top-k" | "k-way";
}

function TwoHeapsViz() {
  const [step, setStep] = React.useState(0);
  const insertions = [5, 3, 8, 2, 7, 1, 9, 4];
  const states = [
    { maxH: [5], minH: [], median: 5 },
    { maxH: [3, 5], minH: [], median: 4 },
    { maxH: [3, 5], minH: [8], median: 5 },
    { maxH: [2, 3, 5], minH: [8], median: 4 },
    { maxH: [3, 5], minH: [7, 8], median: 6 },
    { maxH: [1, 3, 5], minH: [7, 8], median: 5 },
    { maxH: [3, 5], minH: [7, 8, 9], median: 6 },
    { maxH: [3, 4, 5], minH: [7, 8, 9], median: 5.5 },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % states.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const current = states[step];

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">
        Inserting: <span className="text-primary font-bold">{insertions[step]}</span>
      </p>
      <div className="flex items-start justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-blue-400">Max-Heap (lower half)</span>
          <div className="flex flex-wrap gap-1 justify-center">
            {[...current.maxH].sort((a, b) => b - a).map((v, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  i === 0
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-blue-500/20 text-blue-300 border-blue-500/50"
                }`}
              >
                {v}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">top: {Math.max(...current.maxH)}</span>
        </div>
        <div className="flex flex-col items-center justify-center pt-4">
          <div className="bg-primary/20 border border-primary/50 rounded-lg px-4 py-2 text-center">
            <div className="text-xs text-muted-foreground">Median</div>
            <div className="text-xl font-bold text-primary">{current.median}</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-orange-400">Min-Heap (upper half)</span>
          <div className="flex flex-wrap gap-1 justify-center">
            {[...current.minH].sort((a, b) => a - b).map((v, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  i === 0
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-orange-500/20 text-orange-300 border-orange-500/50"
                }`}
              >
                {v}
              </div>
            ))}
            {current.minH.length === 0 && (
              <div className="text-xs text-muted-foreground italic">empty</div>
            )}
          </div>
          {current.minH.length > 0 && (
            <span className="text-xs text-muted-foreground">top: {Math.min(...current.minH)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TopKViz() {
  const stream = [3, 1, 5, 12, 2, 11, 7, 8];
  const k = 3;
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % stream.length);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const seen = stream.slice(0, step + 1);
  const heap = [...seen].sort((a, b) => a - b).slice(-k);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">Find top K={k} largest elements</p>
      <div className="flex justify-center gap-1">
        {stream.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-300 ${
                i === step
                  ? "bg-yellow-500 text-white border-yellow-500 scale-110"
                  : i < step
                  ? "bg-muted border-muted text-muted-foreground"
                  : "bg-card border-border text-foreground"
              }`}
            >
              {val}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-muted-foreground">Min-heap (top K):</span>
        <div className="flex gap-2">
          {heap.map((v, i) => (
            <div
              key={i}
              className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                i === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-primary/20 text-primary border-primary/50"
              }`}
            >
              {v}
            </div>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Kth largest = <span className="text-primary font-bold">{heap[0] ?? "?"}</span>
        </span>
      </div>
    </div>
  );
}

export default function HeapVisualization({ type }: HeapVizProps) {
  if (type === "two-heaps") return <TwoHeapsViz />;
  return <TopKViz />;
}
