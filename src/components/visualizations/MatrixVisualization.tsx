import React from "react";

const WEIGHTS = [1, 3, 4, 5];
const VALUES = [1, 4, 5, 7];
const W = 7;

export default function MatrixVisualization() {
  const n = WEIGHTS.length;
  const [highlightCell, setHighlightCell] = React.useState<[number, number]>([0, 0]);
  const [step, setStep] = React.useState(0);

  // Build DP table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      dp[i][w] = dp[i - 1][w];
      if (WEIGHTS[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - WEIGHTS[i - 1]] + VALUES[i - 1]);
      }
    }
  }

  const totalCells = (n + 1) * (W + 1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % totalCells;
        const row = Math.floor(next / (W + 1));
        const col = next % (W + 1);
        setHighlightCell([row, col]);
        return next;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const [hRow, hCol] = highlightCell;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">
        0/1 Knapsack DP table — weights=[1,3,4,5], values=[1,4,5,7], W=7
      </p>
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-xs">
          <thead>
            <tr>
              <th className="w-10 h-8 border border-border/40 bg-muted/30 text-muted-foreground font-medium px-1">
                i\w
              </th>
              {Array.from({ length: W + 1 }, (_, w) => (
                <th key={w} className="w-9 h-8 border border-border/40 bg-muted/30 text-muted-foreground font-medium px-1">
                  {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: n + 1 }, (_, i) => (
              <tr key={i}>
                <td className="border border-border/40 bg-muted/20 text-muted-foreground text-center font-medium px-1">
                  {i === 0 ? "0" : `item${i}`}
                </td>
                {Array.from({ length: W + 1 }, (_, w) => {
                  const isHighlighted = hRow === i && hCol === w;
                  const isMax = dp[i][w] === dp[n][W] && dp[i][w] > 0;
                  return (
                    <td
                      key={w}
                      className={`border border-border/40 text-center font-bold px-1 h-9 transition-all duration-100 ${
                        isHighlighted
                          ? "bg-primary text-primary-foreground scale-105"
                          : isMax && i === n
                          ? "bg-green-500/30 text-green-400"
                          : dp[i][w] > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-card text-muted-foreground"
                      }`}
                    >
                      {dp[i][w]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-sm">
        Max value: <span className="text-green-500 font-bold text-lg">{dp[n][W]}</span>
      </p>
    </div>
  );
}
