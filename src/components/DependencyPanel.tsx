import { motion } from "framer-motion";
import { Package, Wrench } from "lucide-react";
import type { Dependency } from "@/lib/mockData";

export const DependencyPanel = ({ deps }: { deps: Dependency[] }) => {
  const prod = deps.filter((d) => d.type === "production");
  const dev = deps.filter((d) => d.type === "dev");

  return (
    <div className="flex gap-8 py-2 overflow-x-auto">
      <div className="min-w-[260px]">
        <div className="flex items-center gap-2 mb-3">
          <Package className="h-4 w-4 text-neon-green" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neon-green">
            Production ({prod.length})
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {prod.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-md border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs"
            >
              <span className="text-foreground">{d.name}</span>
              <span className="ml-2 text-muted-foreground">{d.version}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="min-w-[200px]">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="h-4 w-4 text-neon-purple" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neon-purple">
            Dev ({dev.length})
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {dev.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 + 0.2 }}
              className="rounded-md border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs"
            >
              <span className="text-foreground">{d.name}</span>
              <span className="ml-2 text-muted-foreground">{d.version}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
