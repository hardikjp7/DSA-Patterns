import React from "react";

export default function LinkedListVisualization() {
  const [step, setStep] = React.useState(0);

  const nodes = [
    { val: 1, id: 0 },
    { val: 2, id: 1 },
    { val: 3, id: 2 },
    { val: 4, id: 3 },
    { val: 5, id: 4 },
    { val: 2, id: 5, isCycle: true }, // cycle back to id=1
  ];

  // Visible nodes in the linear display
  const displayNodes = [
    { val: 1, id: 0 },
    { val: 2, id: 1 },
    { val: 3, id: 2 },
    { val: 4, id: 3 },
    { val: 5, id: 4 },
  ];

  // slow moves 1 step, fast moves 2 steps
  const positions = [
    { slow: 0, fast: 0, label: "Start" },
    { slow: 1, fast: 2, label: "Step 1" },
    { slow: 2, fast: 4, label: "Step 2" },
    { slow: 3, fast: 2, label: "Step 3 (fast wraps via cycle)" },
    { slow: 4, fast: 4, label: "Step 4: Slow == Fast → Cycle detected!" },
  ];

  const current = positions[step % positions.length];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % positions.length);
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  const isMeeting = current.slow === current.fast && step > 0;

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground text-center">Floyd's Cycle Detection (Slow=1 step, Fast=2 steps)</p>

      {/* Linked list display */}
      <div className="flex items-center justify-center gap-0 overflow-x-auto py-2">
        {displayNodes.map((node, i) => {
          const isSlow = current.slow === i;
          const isFast = current.fast === i;
          const isBoth = isSlow && isFast;
          return (
            <React.Fragment key={node.id}>
              <div className="flex flex-col items-center gap-1">
                {/* Labels */}
                <div className="h-6 flex gap-0.5 text-xs font-bold">
                  {isSlow && !isBoth && <span className="text-blue-500">S</span>}
                  {isFast && !isBoth && <span className="text-orange-500">F</span>}
                  {isBoth && <span className="text-green-500 text-sm">S+F</span>}
                  {!isSlow && !isFast && <span className="opacity-0">·</span>}
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border-2 font-bold text-sm transition-all duration-400 ${
                    isBoth
                      ? "bg-green-500 text-white border-green-500 scale-110"
                      : isSlow
                      ? "bg-blue-500 text-white border-blue-500 scale-110"
                      : isFast
                      ? "bg-orange-500 text-white border-orange-500 scale-110"
                      : "bg-card text-foreground border-border"
                  }`}
                >
                  {node.val}
                </div>
              </div>
              {i < displayNodes.length - 1 && (
                <div className="flex items-center mb-1">
                  <div className="w-5 h-0.5 bg-border"></div>
                  <div className="w-0 h-0 border-l-4 border-l-border border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        {/* Cycle arrow back */}
        <div className="flex flex-col items-center ml-1">
          <div className="w-6 h-0.5 bg-border"></div>
          <div className="flex flex-col items-center">
            <svg width="60" height="40" viewBox="0 0 60 40" className="overflow-visible">
              <path d="M 0 8 Q 30 -15 60 8" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" strokeDasharray="5,3"/>
              <polygon points="0,4 0,12 8,8" fill="hsl(var(--destructive))"/>
            </svg>
            <span className="text-xs text-destructive font-semibold -mt-1">cycle→2</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div
        className={`text-center text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
          isMeeting
            ? "bg-green-500/20 text-green-500 border border-green-500/30"
            : "text-muted-foreground"
        }`}
      >
        {current.label}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-500"></span> Slow pointer
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-orange-500"></span> Fast pointer
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-500"></span> Meeting point
        </span>
      </div>
    </div>
  );
}
