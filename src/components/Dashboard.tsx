import { motion } from "framer-motion";
import { Code2, FolderTree, Boxes, Brain, Package, ArrowLeft } from "lucide-react";
import { FileTree } from "@/components/FileTree";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { AIExplanation } from "@/components/AIExplanation";
import { DependencyPanel } from "@/components/DependencyPanel";
import type { AnalysisResult } from "@/lib/mockData";

const PanelHeader = ({ icon: Icon, title, color }: { icon: typeof Code2; title: string; color: string }) => (
  <div className={`flex items-center gap-2 px-4 py-3 border-b border-border`}>
    <Icon className={`h-4 w-4 ${color}`} />
    <h2 className={`font-mono text-xs font-bold uppercase tracking-wider ${color}`}>{title}</h2>
  </div>
);

export const Dashboard = ({ data, onBack }: { data: AnalysisResult; onBack: () => void }) => (
  <div className="h-screen flex flex-col bg-background">
    {/* Top bar */}
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50 backdrop-blur-sm shrink-0"
    >
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Code2 className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="font-bold text-sm">
          <span className="text-primary">Code</span>Leo
        </span>
        <span className="text-muted-foreground/40">|</span>
        <span className="font-mono text-xs text-muted-foreground">{data.projectName}</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="rounded-md bg-neon-blue/10 border border-neon-blue/30 px-2 py-1 text-neon-blue">{data.language}</span>
        <span className="rounded-md bg-neon-purple/10 border border-neon-purple/30 px-2 py-1 text-neon-purple">{data.framework}</span>
      </div>
    </motion.header>

    {/* Main content */}
    <div className="flex-1 flex overflow-hidden">
      {/* Left: File Tree */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="w-72 border-r border-border flex flex-col shrink-0 bg-card/30"
      >
        <PanelHeader icon={FolderTree} title="File Structure" color="text-neon-orange" />
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <FileTree files={data.fileTree} />
        </div>
      </motion.aside>

      {/* Center: Diagram */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col min-w-0"
      >
        <PanelHeader icon={Boxes} title="Architecture Diagram" color="text-neon-green" />
        <div className="flex-1 overflow-hidden">
          <ArchitectureDiagram />
        </div>
      </motion.main>

      {/* Right: AI Explanation */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="w-96 border-l border-border flex flex-col shrink-0 bg-card/30"
      >
        <PanelHeader icon={Brain} title="AI Explanation" color="text-neon-purple" />
        <div className="flex-1 overflow-y-auto px-4">
          <AIExplanation data={data} />
        </div>
      </motion.aside>
    </div>

    {/* Bottom: Dependencies */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="border-t border-border bg-card/30 shrink-0"
    >
      <PanelHeader icon={Package} title="Dependencies" color="text-neon-blue" />
      <div className="px-4 pb-3 max-h-36 overflow-y-auto">
        <DependencyPanel deps={data.dependencies} />
      </div>
    </motion.div>
  </div>
);
