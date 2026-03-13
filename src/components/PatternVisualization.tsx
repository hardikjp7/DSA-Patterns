import React from "react";
import { DSAPattern } from "@/data/patterns";
import TreeVisualization from "./visualizations/TreeVisualization";
import ArrayVisualization from "./visualizations/ArrayVisualization";
import LinkedListVisualization from "./visualizations/LinkedListVisualization";
import HeapVisualization from "./visualizations/HeapVisualization";
import GraphVisualization from "./visualizations/GraphVisualization";
import MatrixVisualization from "./visualizations/MatrixVisualization";
import StackVisualization from "./visualizations/StackVisualization";
import IntervalsVisualization from "./visualizations/IntervalsVisualization";

interface Props {
  pattern: DSAPattern;
}

export default function PatternVisualization({ pattern }: Props) {
  const vizTypeMap: Record<string, React.ReactNode> = {
    "tree": pattern.id === "tree-bfs" ? (
      <TreeVisualization type="bfs" step={7} />
    ) : (
      <TreeVisualization type="dfs-path" step={4} />
    ),
    "slidingwindow": <ArrayVisualization type="slidingwindow" />,
    "twopointer": <ArrayVisualization type="twopointer" />,
    "array": pattern.id === "binary-search" || pattern.id === "modified-binary-search"
      ? <ArrayVisualization type="binarysearch" />
      : <ArrayVisualization type="slidingwindow" />,
    "linkedlist": <LinkedListVisualization />,
    "heap": pattern.id === "two-heaps"
      ? <HeapVisualization type="two-heaps" />
      : pattern.id === "k-way-merge"
      ? <HeapVisualization type="k-way" />
      : <HeapVisualization type="top-k" />,
    "graph": <GraphVisualization />,
    "matrix": <MatrixVisualization />,
    "stack": <StackVisualization />,
    "intervals": <IntervalsVisualization />,
  };

  const subtypeKey = pattern.id === "tree-bfs" || pattern.id === "tree-dfs" ? "tree" : pattern.visualizationType;
  const viz = vizTypeMap[subtypeKey] || vizTypeMap[pattern.visualizationType];

  if (!viz) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        Visualization coming soon
      </div>
    );
  }

  return (
    <div className="bg-card/50 border border-border rounded-xl p-4">
      {viz}
    </div>
  );
}
