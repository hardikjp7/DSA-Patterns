import React from "react";
import { useParams, useLocation } from "wouter";
import { dsaPatterns } from "@/data/patterns";
import { useProgressStore } from "@/store/progress";
import PatternVisualization from "@/components/PatternVisualization";
import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, Bookmark, BookmarkCheck, ArrowLeft, Clock, HardDrive, Lightbulb, Target } from "lucide-react";

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function PatternDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const pattern = dsaPatterns.find((p) => p.id === id);
  const { completed, bookmarked, toggleComplete, toggleBookmark } = useProgressStore();

  React.useEffect(() => {
    if (id) useProgressStore.getState().setLastVisited(id);
  }, [id]);

  if (!pattern) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Pattern not found</p>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const isCompleted = completed[pattern.id];
  const isBookmarked = bookmarked[pattern.id];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            All Patterns
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBookmark(pattern.id)}
              className="gap-2"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-yellow-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => toggleComplete(pattern.id)}
              className={`gap-2 ${isCompleted ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
              {isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs">{pattern.category}</Badge>
            <Badge className={`text-xs border ${difficultyColor[pattern.difficulty]}`}>
              {pattern.difficulty}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{pattern.name}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{pattern.description}</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5" />
              Time Complexity
            </div>
            <p className="font-mono font-bold text-primary">{pattern.timeComplexity}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <HardDrive className="w-3.5 h-3.5" />
              Space Complexity
            </div>
            <p className="font-mono font-bold text-primary">{pattern.spaceComplexity}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 space-y-1 sm:col-span-2">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Lightbulb className="w-3.5 h-3.5" />
              Key Insight
            </div>
            <p className="text-sm text-foreground leading-relaxed">{pattern.keyInsight}</p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <Target className="w-4 h-4" />
            Common Use Cases
          </div>
          <div className="flex flex-wrap gap-2">
            {pattern.useCases.map((uc) => (
              <Badge key={uc} variant="secondary" className="text-xs">
                {uc}
              </Badge>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Live Visualization</h2>
          <PatternVisualization pattern={pattern} />
        </div>

        {/* Code Examples */}
        {pattern.examples.map((example, idx) => (
          <div key={idx} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{example.title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{example.description}</p>
            </div>
            <Tabs defaultValue="cpp">
              <TabsList className="mb-0">
                <TabsTrigger value="cpp" className="gap-2">
                  <span className="text-blue-400 font-mono text-xs">C++</span>
                </TabsTrigger>
                <TabsTrigger value="python" className="gap-2">
                  <span className="text-yellow-400 font-mono text-xs">Python</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cpp">
                <CodeBlock code={example.cpp} language="cpp" />
              </TabsContent>
              <TabsContent value="python">
                <CodeBlock code={example.python} language="python" />
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </div>
    </div>
  );
}
