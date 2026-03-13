import React from "react";

interface ArrayVizProps {
  type: "slidingwindow" | "twopointer" | "array" | "binarysearch";
}

const SAMPLE_ARRAY = [2, 1, 5, 1, 3, 2];
const SORTED_ARRAY = [1, 2, 3, 4, 6];

function SlidingWindowViz() {
  const [step, setStep] = React.useState(0);
  const k = 3;
  const maxStep = SAMPLE_ARRAY.length - k;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s >= maxStep ? 0 : s + 1));
    }, 900);
    return () => clearInterval(timer);
  }, [maxStep]);

  const windowSum = SAMPLE_ARRAY.slice(step, step + k).reduce((a, b) => a + b, 0);
  const maxSum = 9;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">Find max sum subarray of size k=3</p>
      <div className="flex justify-center gap-1">
        {SAMPLE_ARRAY.map((val, i) => {
          const inWindow = i >= step && i < step + k;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-300 ${
                  inWindow
                    ? "bg-primary text-primary-foreground border-primary scale-110"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {val}
              </div>
              <span className="text-xs text-muted-foreground">{i}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Window sum:</span>
          <span className="font-bold text-primary text-lg">{windowSum}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Max so far:</span>
          <span className="font-bold text-green-500 text-lg">{maxSum}</span>
        </div>
      </div>
      <div className="flex justify-center gap-1 text-xs text-muted-foreground">
        {Array.from({ length: maxStep + 1 }, (_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}

function TwoPointerViz() {
  const [step, setStep] = React.useState(0);
  const target = 6;
  const steps = [
    { left: 0, right: 4, sum: 7 },
    { left: 0, right: 3, sum: 5 },
    { left: 1, right: 3, sum: 6 },
  ];
  const current = steps[step % steps.length];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">Find pair with sum = {target}</p>
      <div className="flex justify-center gap-1">
        {SORTED_ARRAY.map((val, i) => {
          const isLeft = i === current.left;
          const isRight = i === current.right;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 text-xs font-bold text-center">
                {isLeft && <span className="text-blue-500">L</span>}
                {isRight && <span className="text-orange-500">R</span>}
              </div>
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-300 ${
                  isLeft
                    ? "bg-blue-500 text-white border-blue-500 scale-110"
                    : isRight
                    ? "bg-orange-500 text-white border-orange-500 scale-110"
                    : current.sum === target && (isLeft || isRight)
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {val}
              </div>
              <span className="text-xs text-muted-foreground">{i}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold">L[{current.left}]={SORTED_ARRAY[current.left]}</span>
          <span className="text-muted-foreground">+</span>
          <span className="text-orange-400 font-bold">R[{current.right}]={SORTED_ARRAY[current.right]}</span>
          <span className="text-muted-foreground">=</span>
          <span
            className={`font-bold text-lg ${
              current.sum === target ? "text-green-500" : "text-red-400"
            }`}
          >
            {current.sum}
          </span>
        </div>
      </div>
      {current.sum === target && (
        <p className="text-center text-green-500 text-sm font-semibold animate-pulse">
          Found! Indices [{current.left}, {current.right}]
        </p>
      )}
      {current.sum > target && (
        <p className="text-center text-orange-400 text-xs">Sum too large → move Right pointer left</p>
      )}
      {current.sum < target && (
        <p className="text-center text-blue-400 text-xs">Sum too small → move Left pointer right</p>
      )}
    </div>
  );
}

function BinarySearchViz() {
  const arr = [1, 3, 5, 7, 9, 11];
  const target = 7;
  const [step, setStep] = React.useState(0);
  const steps = [
    { left: 0, right: 5, mid: 2, val: 5, action: "5 < 7, go right" },
    { left: 3, right: 5, mid: 4, val: 9, action: "9 > 7, go left" },
    { left: 3, right: 3, mid: 3, val: 7, action: "Found 7 at index 3!" },
  ];
  const current = steps[step % steps.length];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">Searching for target = {target}</p>
      <div className="flex justify-center gap-1">
        {arr.map((val, i) => {
          const isLeft = i === current.left;
          const isRight = i === current.right;
          const isMid = i === current.mid;
          const inRange = i >= current.left && i <= current.right;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 text-xs font-bold text-center">
                {isLeft && <span className="text-green-500">L</span>}
                {isMid && <span className="text-yellow-500">M</span>}
                {isRight && <span className="text-red-500">R</span>}
              </div>
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all duration-300 ${
                  isMid
                    ? val === target
                      ? "bg-green-500 text-white border-green-500 scale-110"
                      : "bg-yellow-500 text-white border-yellow-500 scale-110"
                    : inRange
                    ? "bg-primary/20 border-primary text-foreground"
                    : "bg-muted border-muted text-muted-foreground opacity-50"
                }`}
              >
                {val}
              </div>
              <span className="text-xs text-muted-foreground">{i}</span>
            </div>
          );
        })}
      </div>
      <p className={`text-center text-sm font-medium ${current.val === target ? "text-green-500" : "text-muted-foreground"}`}>
        {current.action}
      </p>
    </div>
  );
}

export default function ArrayVisualization({ type }: ArrayVizProps) {
  if (type === "slidingwindow") return <SlidingWindowViz />;
  if (type === "twopointer") return <TwoPointerViz />;
  return <BinarySearchViz />;
}
