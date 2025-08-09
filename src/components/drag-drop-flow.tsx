import React, { useRef, useCallback, useEffect, useState } from "react";
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
import Header from "./header";
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
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  function checkAllConencted(): any[] | undefined {
    let collectAllDisconnectedNodes: any[] = [];
    for (const node of nodes) {
      var isConencted = false;
      for (const edge of edges) {
        if (edge?.source?.includes(node.id)) {
          isConencted = true;
          break;
        }
      }
      if (!isConencted) {
        collectAllDisconnectedNodes.push(node);

        if (collectAllDisconnectedNodes.length > 1) {
          return collectAllDisconnectedNodes;
        }
      }
    }
  }

  console.log("nodes", nodes);
  console.log("edges", edges);
  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        console.log("eds", eds);
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
        params.connected = true;
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
      const nodeId = getId();
      const newNode = {
        id: nodeId,
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        connected: false,
        // data: { label: `${type} node` },
        data: { label: `${nodeId} node` },
      };
      // console.log("newNode", newNode);
      setNodes((nds) => nds.concat(newNode as unknown as any));
    },
    [screenToFlowPosition, type]
  );
  // console.log("isError", saveState);

  return (
    <>
      <Header collectAllDisconnectedNodes={checkAllConencted} />
      <div className="dndflow">
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
    </>
  );
};

export default DnDFlow;
