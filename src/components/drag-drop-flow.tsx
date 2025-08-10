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
  type Node,
} from "@xyflow/react";
import Header from "./header";
import "@xyflow/react/dist/style.css";

import Sidebar from "./sidebar";
import { DnDProvider, useDnD } from "./dnd-context";

let id = 0;
const getId = () => `test message ${++id}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [value, setValue] = useState<string>("");

  const [selectedNode, setSelectedNode] = useState<{
    isSelected: boolean;
    node: Node | null;
  }>({ isSelected: false, node: null });

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
    if (collectAllDisconnectedNodes.length === 1) {
      if (selectedNode.node) {
        setNodes(
          nodes.map((node) => {
            if (node.id === selectedNode.node!.id) {
              return { ...node, data: { ...node.data, label: value } };
            } else {
              return node;
            }
          })
        );
      }
      // alert(value);
    }
  }

  console.log("nodes", nodes);
  // console.log("edges", edges);
  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        // console.log("params", params);
        if (eds.length > 0) {
          for (const edge of eds) {
            if (edge.source === params.source) {
              console.log("Source handle can only have one edge", id);
              return eds;
            }
          }
        }

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

  useEffect(() => {
    // let isTriggered=
    const selected = nodes.find((node) => node?.selected);

    if (selected) {
      setSelectedNode(() => ({
        node: selected,
        isSelected: true,
      }));
    } else {
      setSelectedNode((prev) => ({
        ...prev,
        isSelected: false,
      }));
    }
  }, [nodes]);
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
            // nodeTypes={nodeTypes}
            //   onDragStart={onDragStart}
            panOnScroll={false}
            // nodesDraggable={true}
            selectionOnDrag={false}
            panOnDrag={true}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar
          selectedNode={selectedNode}
          setSelectedNode={(close: boolean) =>
            setSelectedNode((prev) => ({ ...prev, isSelected: close }))
          }
          value={value}
          setValue={setValue}
        />
      </div>
    </>
  );
};

export default DnDFlow;
