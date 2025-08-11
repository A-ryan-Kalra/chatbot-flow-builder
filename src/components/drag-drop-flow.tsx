import { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Position,
  type Node,
} from "@xyflow/react";
import Header from "./header";
import "@xyflow/react/dist/style.css";

import Sidebar from "./sidebar";
import { useDnD } from "./dnd-context";
import CustomNode from "./custom-node";

let id = 0;
const getId = () => `test message ${++id}`;

const nodeTypes = {
  custom: CustomNode,
};
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

  function checkAllEmptyTargets(): any[] | undefined {
    let collectAllEmptyTargetHandlers: any[] = [];

    for (const node of nodes) {
      /** Iterating over each elements of edges and check if a current edge has source handle referring to the current node and if there are more than one nodes with empty target handles will throw an error. **/

      var isConencted = false;
      /**  isConencted is used to break the edge loop without having to iterate all the elements once it's found otherwise it will be added to collectAllEmptyTargetHandlers. **/

      for (const edge of edges) {
        if (edge?.source?.includes(node.id)) {
          isConencted = true;
          break;
        }
      }

      if (!isConencted) {
        collectAllEmptyTargetHandlers.push(node);
        //It will break the loop and throws an error, if more than one Node has empty target handles.
        if (collectAllEmptyTargetHandlers.length > 1) {
          return collectAllEmptyTargetHandlers;
        }
      }
    }
  }

  useEffect(() => {
    //It will simply save the new values to the selected node.
    if (value) {
      setNodes(
        nodes.map((node) => {
          if (node.id === selectedNode.node!.id) {
            return {
              ...node,
              data: { ...node.data, label: value.trim() ?? node.data.label },
            };
          } else {
            return node;
          }
        })
      );
    }
  }, [value]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
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

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeId = getId();
      const newNode = {
        id: nodeId,
        type: "custom",
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        connected: false,
        data: {
          label: `${nodeId} node`,
        },
      };

      setNodes((nds) => nds.concat(newNode as unknown as any));
    },
    [screenToFlowPosition, type]
  );

  useEffect(() => {
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
      <Header collectAllDisconnectedNodes={checkAllEmptyTargets} />
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
            panOnScroll={false}
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
