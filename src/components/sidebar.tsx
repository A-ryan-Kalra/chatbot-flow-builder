import { useDnD } from "./dnd-context";
import { MessageSquareTextIcon } from "lucide-react";

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event: any, nodeType: any) => {
    setType!(nodeType as unknown as any);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="flex flex-wrap border-[1px] border-slate-400">
      <div
        className="border-[1.5px] basis-1/2 items-center justify-center w-fit h-fit border-blue-600 bg-white cursor-pointer rounded-sm p-2 text-sm"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        <MessageSquareTextIcon className="mx-auto text-blue-500" />
      </div>
    </aside>
  );
};
