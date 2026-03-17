import { useState } from "react";
import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from "lucide-react";
import type { FileNode } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

const FileIcon = ({ node }: { node: FileNode }) => {
  if (node.type === "folder") return null;
  return <FileCode className="h-4 w-4 shrink-0 text-neon-blue" />;
};

const RoleBadge = ({ role }: { role?: string }) => {
  if (!role) return null;
  const colors: Record<string, string> = {
    "Entry Point": "bg-neon-green/20 text-neon-green",
    "Root Component": "bg-neon-purple/20 text-neon-purple",
    Controller: "bg-neon-orange/20 text-neon-orange",
    Model: "bg-neon-blue/20 text-neon-blue",
    Service: "bg-primary/20 text-primary",
    Middleware: "bg-muted-foreground/20 text-muted-foreground",
    Config: "bg-secondary-foreground/20 text-secondary-foreground",
    "Redux Store": "bg-neon-purple/20 text-neon-purple",
    "API Client": "bg-neon-blue/20 text-neon-blue",
    "Server Entry": "bg-neon-green/20 text-neon-green",
    "Express App": "bg-neon-orange/20 text-neon-orange",
    Documentation: "bg-muted-foreground/20 text-muted-foreground",
  };
  return (
    <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-mono font-medium ${colors[role] || "bg-muted text-muted-foreground"}`}>
      {role}
    </span>
  );
};

const TreeNode = ({ node, depth = 0 }: { node: FileNode; depth?: number }) => {
  const [open, setOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder && setOpen(!open)}
        className="flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-sm hover:bg-secondary/60 transition-colors group"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder ? (
          <>
            {open ? (
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
            {open ? (
              <FolderOpen className="h-4 w-4 shrink-0 text-neon-orange" />
            ) : (
              <Folder className="h-4 w-4 shrink-0 text-neon-orange" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <FileIcon node={node} />
          </>
        )}
        <span className="font-mono text-xs truncate">{node.name}</span>
        <RoleBadge role={node.role} />
      </button>
      <AnimatePresence>
        {isFolder && open && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {node.children.map((child, i) => (
              <TreeNode key={child.name + i} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FileTree = ({ files }: { files: FileNode[] }) => (
  <div className="py-2">
    {files.map((node, i) => (
      <TreeNode key={node.name + i} node={node} />
    ))}
  </div>
);
