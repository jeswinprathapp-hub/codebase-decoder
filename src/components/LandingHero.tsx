import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Upload, Zap, ArrowRight, Code2, GitBranch, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LandingHeroProps {
  onAnalyze: (url: string) => void;
}

export const LandingHero = ({ onAnalyze }: LandingHeroProps) => {
  const [url, setUrl] = useState("");

  const handleSample = () => {
    setUrl("https://github.com/example/e-commerce-platform");
    onAnalyze("https://github.com/example/e-commerce-platform");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden grid-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 max-w-3xl px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center glow-green">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary text-glow-green">Code</span>
            <span className="text-foreground">Leo</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-secondary-foreground mb-2 font-light"
        >
          AI-Powered Codebase Understanding
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-10 max-w-lg mx-auto"
        >
          Turn thousands of lines of code into clear architecture diagrams and explanations in seconds.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mb-10"
        >
          {[
            { icon: GitBranch, label: "Dependency Graph", color: "text-neon-purple" },
            { icon: Brain, label: "AI Explanation", color: "text-neon-green" },
            { icon: Zap, label: "Instant Analysis", color: "text-neon-orange" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-sm text-secondary-foreground">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl mx-auto space-y-4"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/user/repository"
                className="pl-10 h-12 bg-card border-border font-mono text-sm"
              />
            </div>
            <Button
              onClick={() => url && onAnalyze(url)}
              disabled={!url}
              className="h-12 px-6 bg-primary text-primary-foreground font-mono font-semibold hover:bg-primary/90 glow-green"
            >
              Analyze
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Upload className="h-4 w-4" />
              Upload ZIP
            </button>
            <span className="text-muted-foreground/40">|</span>
            <button
              onClick={handleSample}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-mono"
            >
              <Zap className="h-3.5 w-3.5" />
              Try Sample Project
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
