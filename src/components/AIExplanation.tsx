import { motion } from "framer-motion";
import { Brain, Lightbulb, Play, Layers, Zap } from "lucide-react";
import type { AnalysisResult } from "@/lib/mockData";

const Section = ({
  icon: Icon,
  title,
  content,
  color,
  delay,
}: {
  icon: typeof Brain;
  title: string;
  content: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="mb-4"
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <h3 className={`font-mono text-xs font-bold uppercase tracking-wider ${color}`}>{title}</h3>
    </div>
    <p className="text-sm leading-relaxed text-secondary-foreground">{content}</p>
  </motion.div>
);

export const AIExplanation = ({ data }: { data: AnalysisResult }) => (
  <div className="space-y-1 py-2">
    <Section icon={Brain} title="Project Overview" content={data.summary} color="text-neon-green" delay={0.1} />
    <Section icon={Layers} title="Architecture" content={data.architecture} color="text-neon-purple" delay={0.2} />
    <Section icon={Play} title="Entry Point" content={`The main entry point is ${data.entryPoint}. Start here to understand the application bootstrap.`} color="text-neon-blue" delay={0.3} />
    <Section icon={Zap} title="Execution Flow" content={data.executionFlow} color="text-neon-orange" delay={0.4} />

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-neon-green" />
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neon-green">Key Modules</h3>
      </div>
      <div className="space-y-2">
        {data.modules.map((mod, i) => (
          <motion.div
            key={mod.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="rounded-lg border border-border bg-secondary/40 p-3"
          >
            <h4 className="font-mono text-xs font-semibold text-foreground mb-1">{mod.name}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);
