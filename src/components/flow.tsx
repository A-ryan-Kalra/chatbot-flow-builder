import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode = () => (
  <div style={{ padding: 10, border: "1px solid #777", borderRadius: "5px" }}>
    <Handle type="target" position={Position.Left} />
    <div>Node content</div>
    <Handle type="source" position={Position.Right} />
  </div>
);
const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "n1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
  },
  {
    id: "n2",
    type: "custom",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
  },
  {
    id: "n3",
    type: "custom",
    position: { x: 0, y: 100 },
    data: { label: "Node 3" },
  },
];
const initialEdges = [
  {
    id: "e1-n2",
    source: "n1",
    target: "n2",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

export default function App() {
  const [variant, setVariant] = useState<BackgroundVariant>(
    "dots" as BackgroundVariant
  );
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  console.log(nodes);

  //Added event handler to update the state of both node and edges
  const onNodesChange = useCallback((changes: any) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
  }, []);

  //Trigger on change in the status(selected or removed) of edges
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => {
        console.log("onEdgesChange", edgesSnapshot);
        return applyEdgeChanges(changes, edgesSnapshot);
      }),
    []
  );

  //It triggers wherenever a new connection is made between two nodes
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => {
        console.log("edgesSnapshot", edgesSnapshot); //collection of connected edges object
        console.log("params", params); //trigger the most recent edges connected
        return addEdge(params, edgesSnapshot);
      }),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        // panOnScroll
        // selectionOnDrag
        // panOnDrag={false}

        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        {/* <MiniMap /> */}
        {/* <Background color="skyblue" variant={variant} /> */}
      </ReactFlow>
    </div>
  );
}
