import type { Node } from "@xyflow/react";
import { useDnD } from "./dnd-context";
import { MessageSquareTextIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

interface SideProps {
  value: string;
  setValue: (value: string) => void;
  selectedNode: {
    isSelected: boolean;
    node: Node | null;
  };
}

export default ({ selectedNode, setValue, value }: SideProps) => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    setType!(nodeType as unknown as any);
    event.dataTransfer.effectAllowed = "move";
  };
  // console.log("Selected", selectedNode);
  return (
    <div className="flex overflow-hidden w-[300px] flex-wrap border-[1px] border-slate-400">
      {selectedNode?.isSelected ? (
        <div
          className={`w-full   duration-300 transition border-[1.5px]  items-center justify-center  h-fit border-slate-400 bg-white cursor-pointer flex flex-col`}
        >
          <h1 className="text-center p-1 border-[1px] w-full ">Message</h1>
          <textarea
            value={value ? value : (selectedNode?.node?.data?.label as string)}
            // defaultValue={selectedNode?.node?.data?.label as string}
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
