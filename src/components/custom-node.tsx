import { Handle, Position } from "@xyflow/react";

export default function CustomNode({ data }: { data: any }) {
  return (
    <div className="flex flex-col mx-1 p-0  w-full  h-[30px] border-[1px] rounded-md border-slate-300">
      <h1 className="text-[8px] text-left border-b-[1px] border-slate-300 px-1">
        Send Message
      </h1>

      <p className="text-[9px]">{data?.label}</p>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
