import React from "react";
import { useLocation } from "wouter";
import { dsaPatterns, categories, DSAPattern } from "@/data/patterns";
import { useProgressStore } from "@/store/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Circle,
  Bookmark,
  BookmarkCheck,
  Search,
  Code2,
  Trophy,
  ChevronRight,
  LayoutDashboard,
  Layers,
} from "lucide-react";

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

const categoryIcon: Record<string, string> = {
  Array: "🔢",
  Tree: "🌳",
  Graph: "🕸️",
  Heap: "⛰️",
  "Linked List": "🔗",
  Backtracking: "🔀",
  Stack: "📚",
  DP: "💡",
};

function PatternCard({ pattern }: { pattern: DSAPattern }) {
  const [, navigate] = useLocation();
  const { completed, bookmarked, toggleComplete, toggleBookmark } = useProgressStore();
  const isCompleted = completed[pattern.id];
  const isBookmarked = bookmarked[pattern.id];

  return (
    <div
      className={`group relative bg-card border rounded-xl p-5 cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 ${
        isCompleted ? "border-green-500/30 bg-green-500/5" : "border-border"
      }`}
      onClick={() => navigate(`/pattern/${pattern.id}`)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg">{categoryIcon[pattern.category] || "📌"}</span>
          <Badge variant="outline" className="text-xs">
            {pattern.category}
          </Badge>
          <Badge className={`text-xs border ${difficultyColor[pattern.difficulty]}`}>
            {pattern.difficulty}
          </Badge>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            className="p-1 rounded hover:bg-muted transition-colors"
            onClick={() => toggleBookmark(pattern.id)}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-yellow-400" />
            ) : (
              <Bookmark className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <button
            className="p-1 rounded hover:bg-muted transition-colors"
            onClick={() => toggleComplete(pattern.id)}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {pattern.name}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{pattern.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
          <span>{pattern.timeComplexity}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

export default function Home() {
  const [, navigate] = useLocation();
  const { completed, bookmarked } = useProgressStore();
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("All");
  const [showBookmarked, setShowBookmarked] = React.useState(false);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const bookmarkedCount = Object.values(bookmarked).filter(Boolean).length;
  const total = dsaPatterns.length;
  const progressPct = Math.round((completedCount / total) * 100);

  const filtered = dsaPatterns.filter((p) => {
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    const matchBookmark = !showBookmarked || bookmarked[p.id];
    return matchSearch && matchCategory && matchDifficulty && matchBookmark;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">DSA Patterns</h1>
              </div>
              <p className="text-muted-foreground max-w-md">
                Master the 16 essential data structure & algorithm patterns with interactive visualizations
                and code examples in C++ and Python.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-wrap">
              <div className="bg-card border border-border rounded-xl px-4 py-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-green-400">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="bg-card border border-border rounded-xl px-4 py-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-yellow-400">{bookmarkedCount}</div>
                <div className="text-xs text-muted-foreground">Bookmarked</div>
              </div>
              <div className="bg-card border border-border rounded-xl px-4 py-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-primary">{total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Overall Progress
              </span>
              <span className="font-semibold text-foreground">{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completedCount} of {total} patterns mastered
              {completedCount === total && " 🎉 All done!"}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-5 space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patterns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Difficulty filters */}
          <div className="flex gap-1">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <Button
                key={d}
                variant={selectedDifficulty === d ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(d)}
                className={`text-xs ${selectedDifficulty === d ? "" : "text-muted-foreground"}`}
              >
                {d}
              </Button>
            ))}
          </div>

          <Button
            variant={showBookmarked ? "default" : "outline"}
            size="sm"
            onClick={() => setShowBookmarked(!showBookmarked)}
            className="text-xs gap-1"
          >
            <Bookmark className="w-3 h-3" />
            Bookmarked
          </Button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {categoryIcon[cat] && `${categoryIcon[cat]} `}{cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {total} patterns
        </p>
      </div>

      {/* Pattern Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <Layers className="w-10 h-10 opacity-30" />
            <p>No patterns match your filters</p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setSelectedCategory("All"); setSelectedDifficulty("All"); setShowBookmarked(false); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
