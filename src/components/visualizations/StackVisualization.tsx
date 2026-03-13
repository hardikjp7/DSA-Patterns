import React from "react";

const NUMS = [2, 1, 2, 4, 3];

export default function StackVisualization() {
  const [step, setStep] = React.useState(0);

  const steps = [
    { i: 0, stack: [0], result: [-1,-1,-1,-1,-1], action: "Push index 0 (val=2)" },
    { i: 1, stack: [0,1], result: [-1,-1,-1,-1,-1], action: "2>1? No. Push index 1 (val=1)" },
    { i: 2, stack: [0,2], result: [-1,2,-1,-1,-1], action: "2>1? Yes! Pop 1→ans=2. 2>2? No. Push 2" },
    { i: 3, stack: [3], result: [-1,2,4,4,-1], action: "4>2? Yes! Pop 2→ans=4. 4>2? Yes! Pop 0→ans=4. Push 3" },
    { i: 4, stack: [3,4], result: [-1,2,4,4,-1], action: "3<4? No. Push index 4 (val=3)" },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const current = steps[step];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground text-center">Next Greater Element — Monotonic Decreasing Stack</p>

      {/* Array */}
      <div>
        <p className="text-xs text-muted-foreground text-center mb-1">Input array:</p>
        <div className="flex justify-center gap-1">
          {NUMS.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-300 ${
                  i === current.i
                    ? "bg-yellow-500 text-white border-yellow-500 scale-110"
                    : current.stack.includes(i)
                    ? "bg-primary/20 border-primary text-foreground"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {val}
              </div>
              <span className="text-xs text-muted-foreground">{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-muted-foreground mb-1">Stack (indices):</p>
          <div className="flex flex-col-reverse gap-1 min-h-[80px] border-b-2 border-x-2 border-border w-20 items-center pb-1 px-1">
            {current.stack.map((idx) => (
              <div key={idx} className="w-14 h-9 bg-primary/20 border border-primary/40 rounded flex items-center justify-center text-xs font-bold text-primary">
                {idx} (val={NUMS[idx]})
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">bottom↑top</p>
        </div>

        {/* Result */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-muted-foreground mb-1">Result:</p>
          <div className="flex gap-1">
            {current.result.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded font-bold text-sm border-2 ${
                    val !== -1
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {val === -1 ? "?" : val}
                </div>
                <span className="text-xs text-muted-foreground">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground bg-muted/30 rounded px-3 py-1.5">
        {current.action}
      </p>
    </div>
  );
}
