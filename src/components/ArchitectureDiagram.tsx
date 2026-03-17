import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Position,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeStyle = (color: string) => ({
  background: `hsl(${color} / 0.1)`,
  border: `1px solid hsl(${color} / 0.5)`,
  borderRadius: "12px",
  padding: "12px 20px",
  color: `hsl(${color})`,
  fontSize: "13px",
  fontFamily: "JetBrains Mono, monospace",
  fontWeight: 600,
  boxShadow: `0 0 20px hsl(${color} / 0.15)`,
});

const initialNodes: Node[] = [
  { id: "client", position: { x: 50, y: 0 }, data: { label: "🌐 React SPA" }, style: nodeStyle("210 90% 60%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "redux", position: { x: 300, y: 0 }, data: { label: "🗃️ Redux Store" }, style: nodeStyle("265 80% 65%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "router", position: { x: 175, y: 100 }, data: { label: "🔀 React Router" }, style: nodeStyle("210 90% 60%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "api", position: { x: 175, y: 210 }, data: { label: "📡 REST API" }, style: nodeStyle("142 70% 50%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "auth-mw", position: { x: 0, y: 320 }, data: { label: "🔒 Auth Middleware" }, style: nodeStyle("25 95% 60%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "routes", position: { x: 200, y: 320 }, data: { label: "🛣️ Express Routes" }, style: nodeStyle("142 70% 50%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "controllers", position: { x: 100, y: 430 }, data: { label: "⚙️ Controllers" }, style: nodeStyle("142 70% 50%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "services", position: { x: 100, y: 540 }, data: { label: "🔧 Services" }, style: nodeStyle("265 80% 65%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "models", position: { x: 100, y: 650 }, data: { label: "📦 Models" }, style: nodeStyle("210 90% 60%"), sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: "mongodb", position: { x: 0, y: 760 }, data: { label: "🍃 MongoDB" }, style: nodeStyle("142 70% 50%"), sourcePosition: Position.Top, targetPosition: Position.Top },
  { id: "redis", position: { x: 200, y: 760 }, data: { label: "⚡ Redis" }, style: nodeStyle("0 84% 60%"), sourcePosition: Position.Top, targetPosition: Position.Top },
  { id: "stripe", position: { x: 370, y: 540 }, data: { label: "💳 Stripe" }, style: nodeStyle("265 80% 65%"), sourcePosition: Position.Left, targetPosition: Position.Left },
  { id: "s3", position: { x: 370, y: 650 }, data: { label: "☁️ AWS S3" }, style: nodeStyle("25 95% 60%"), sourcePosition: Position.Left, targetPosition: Position.Left },
  { id: "email", position: { x: 370, y: 430 }, data: { label: "📧 SendGrid" }, style: nodeStyle("210 90% 60%"), sourcePosition: Position.Left, targetPosition: Position.Left },
];

const edgeStyle = { stroke: "hsl(142 70% 50% / 0.4)", strokeWidth: 2 };
const animatedEdge = { ...edgeStyle, strokeDasharray: "5 5" };

const initialEdges: Edge[] = [
  { id: "e1", source: "client", target: "router", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 50% / 0.6)" } },
  { id: "e1b", source: "client", target: "redux", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(265 80% 65% / 0.6)" } },
  { id: "e2", source: "router", target: "api", style: animatedEdge, animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 50% / 0.6)" } },
  { id: "e3", source: "api", target: "auth-mw", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(25 95% 60% / 0.6)" } },
  { id: "e4", source: "api", target: "routes", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 50% / 0.6)" } },
  { id: "e5", source: "routes", target: "controllers", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 50% / 0.6)" } },
  { id: "e5b", source: "auth-mw", target: "controllers", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 50% / 0.6)" } },
  { id: "e6", source: "controllers", target: "services", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(265 80% 65% / 0.6)" } },
  { id: "e7", source: "services", target: "models", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(210 90% 60% / 0.6)" } },
  { id: "e8", source: "models", target: "mongodb", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(142 70% 50% / 0.6)" } },
  { id: "e9", source: "models", target: "redis", style: animatedEdge, animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(0 84% 60% / 0.6)" } },
  { id: "e10", source: "services", target: "stripe", style: animatedEdge, animated: true },
  { id: "e11", source: "services", target: "s3", style: animatedEdge, animated: true },
  { id: "e12", source: "controllers", target: "email", style: animatedEdge, animated: true },
];

export const ArchitectureDiagram = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-full w-full" style={{ minHeight: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      >
        <Background color="hsl(220 14% 18% / 0.5)" gap={20} size={1} />
        <Controls
          style={{
            background: "hsl(220 18% 10%)",
            border: "1px solid hsl(220 14% 18%)",
            borderRadius: "8px",
          }}
        />
      </ReactFlow>
    </div>
  );
};
