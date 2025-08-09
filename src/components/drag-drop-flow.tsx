import React, { useRef, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Sidebar from "./sidebar";
import { DnDProvider, useDnD } from "./dnd-context";
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
    id: "1",
    // type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();
  console.log(edges);
  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        // console.log("eds", eds);
        // console.log("params", params);
        if (eds.length > 0) {
          for (const edge of eds) {
            if (edge.source === params.source) {
              console.log("Source handle can only have one edge", id);
              return eds;
            }
          }
        }
        console.log(params);

        return addEdge(params, eds);
      }),
    []
  );
  // console.log(nodes);
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      // console.log("type", type);
      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      //   console.log(type);
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: { label: `${type} node` },
      };
      // console.log("newNode", newNode);
      setNodes((nds) => nds.concat(newNode as unknown as any));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        // overflow: "hidden",
      }}
      className="dndflow"
    >
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          //   onDragStart={onDragStart}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
