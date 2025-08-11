import type { Node } from "@xyflow/react";
import { useDnD } from "./dnd-context";
import { ChevronLeft, MessageSquareTextIcon } from "lucide-react";
import { useEffect } from "react";

interface SideProps {
  value: string;
  setValue: (value: string) => void;
  selectedNode: {
    isSelected: boolean;
    node: Node | null;
  };
  setSelectedNode: (value: boolean) => void;
}

export default ({
  selectedNode,
  setSelectedNode,
  setValue,
  value,
}: SideProps) => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    setType!(nodeType as unknown as any);
    event.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (selectedNode?.node?.data?.label)
      setValue(selectedNode?.node?.data?.label as string);
  }, [selectedNode?.node?.data?.label]);
  // console.log("Selected", selectedNode);
  return (
    <div className="flex overflow-hidden w-[300px] flex-wrap border-[1px] border-slate-400">
      {selectedNode?.isSelected ? (
        <div
          className={`w-full   duration-300 transition border-[1.5px]  items-center justify-center  h-fit border-slate-400 bg-white cursor-pointer flex flex-col`}
        >
          <div className="border-[1px] p-1 w-full flex relative">
            <div
              onClick={() => setSelectedNode(false)}
              className=" bg-slate-200 hover:bg-slate-300 duration-200 rounded-full absolute left-2"
            >
              <ChevronLeft />
            </div>
            <h1 className="mx-auto">Message</h1>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-[1px] p-1 focus-visible:border-[1px] focus-visible:ring-1 focus-visible:ring-purple-400 focus-visible:outline-none"
          ></textarea>
        </div>
      ) : (
        <>
          <div
            className={` m-2 duration-300 transition border-[1.5px] basis-1/2 items-center justify-center w-fit h-fit border-blue-600 bg-white cursor-pointer rounded-sm p-2 text-sm`}
            onDragStart={(event) => onDragStart(event, "default")}
            draggable
          >
            <MessageSquareTextIcon className="mx-auto text-blue-500" />
          </div>
        </>
      )}
    </div>
  );
};
