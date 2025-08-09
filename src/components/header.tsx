import { useState } from "react";

interface HeaderProps {
  collectAllDisconnectedNodes: () => any[] | undefined;
}
function header({ collectAllDisconnectedNodes }: HeaderProps) {
  const [errorOnSave, setErrorOnSave] = useState<boolean>(false);
  return (
    <header className="flex justify-end p-1 bg-slate-200">
      {errorOnSave && <button>Cannot Save Changes</button>}
      <button
        onClick={() => {
          const emptyTarget = collectAllDisconnectedNodes();
          setErrorOnSave(emptyTarget ? true : false);
        }}
        className="border-[1.5px] border-blue-600 bg-white cursor-pointer rounded-md px-4 py-1 mr-10 text-sm"
      >
        Save Changes
      </button>
    </header>
  );
}

export default header;
