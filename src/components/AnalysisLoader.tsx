import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  "Cloning repository...",
  "Scanning file structure...",
  "Detecting languages...",
  "Parsing dependencies...",
  "Analyzing architecture...",
  "Mapping module relationships...",
  "Generating AI explanations...",
  "Building diagrams...",
];

export const AnalysisLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return s;
        }
        return s + 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    setProgress(((step + 1) / steps.length) * 100);
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-md px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-8 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto h-16 w-16 rounded-full border-2 border-primary/30 border-t-primary"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
          </div>
          <h2 className="font-mono text-lg font-bold text-foreground mb-6">Analyzing Codebase</h2>

          <div className="space-y-3 mb-8">
            {steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 font-mono text-sm"
              >
                <span className={i < step ? "text-neon-green" : i === step ? "text-primary animate-pulse-glow" : "text-muted-foreground"}>
                  {i < step ? "✓" : i === step ? "●" : "○"}
                </span>
                <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary glow-green"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-2 font-mono text-xs text-muted-foreground">{Math.round(progress)}%</p>
        </motion.div>
      </div>
    </div>
  );
};
