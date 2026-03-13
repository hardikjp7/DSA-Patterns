import React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language: "cpp" | "python";
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Very basic syntax highlighting via regex
  const highlight = (code: string, lang: "cpp" | "python") => {
    const lines = code.split("\n");
    return lines.map((line, lineIdx) => {
      const parts: React.ReactNode[] = [];
      let rest = line;

      // Comment
      const commentIdx = lang === "cpp" ? rest.indexOf("//") : rest.indexOf("#");
      let commentPart = "";
      if (commentIdx !== -1) {
        commentPart = rest.slice(commentIdx);
        rest = rest.slice(0, commentIdx);
      }

      // Keywords
      const keywords =
        lang === "cpp"
          ? ["int", "return", "while", "for", "if", "else", "bool", "void", "auto", "struct", "class", "public", "new", "true", "false", "nullptr", "using", "namespace", "include", "vector", "string", "queue", "stack", "pair", "cout", "cin", "endl"]
          : ["def", "return", "while", "for", "if", "else", "elif", "not", "and", "or", "in", "is", "None", "True", "False", "class", "self", "import", "from", "print", "len", "range", "append", "pop", "heapq"];

      // Simple tokenizer: split on word boundaries
      const tokens = rest.split(/(\b\w+\b|[^\w])/g).filter(Boolean);

      tokens.forEach((token, i) => {
        if (keywords.includes(token)) {
          parts.push(
            <span key={i} className="text-purple-400 font-semibold">
              {token}
            </span>
          );
        } else if (/^\d+(\.\d+)?$/.test(token)) {
          parts.push(
            <span key={i} className="text-yellow-400">
              {token}
            </span>
          );
        } else if (/^".*"$/.test(token) || /^'.*'$/.test(token)) {
          parts.push(
            <span key={i} className="text-green-400">
              {token}
            </span>
          );
        } else {
          parts.push(<span key={i}>{token}</span>);
        }
      });

      if (commentPart) {
        parts.push(
          <span key="comment" className="text-gray-500 italic">
            {commentPart}
          </span>
        );
      }

      return (
        <div key={lineIdx} className="leading-6">
          <span className="select-none text-gray-600 mr-4 text-xs w-6 inline-block text-right">
            {lineIdx + 1}
          </span>
          {parts}
        </div>
      );
    });
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-[#1a1a2e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#16213e] border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {language === "cpp" ? "C++" : "Python"}
          </span>
          <span className="text-xs text-muted-foreground/50">
            {language === "cpp" ? "c_cpp" : "python"}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-gray-300 leading-relaxed">
          <code>{highlight(code, language)}</code>
        </pre>
      </div>
    </div>
  );
}
