import { useEffect, useState } from "react";

interface HeaderProps {
  collectAllDisconnectedNodes: () => any[] | undefined;
}
function header({ collectAllDisconnectedNodes }: HeaderProps) {
  const [errorOnSave, setErrorOnSave] = useState<boolean>(false);
  const [showState, setShowState] = useState<boolean>(false);
  useEffect(() => {
    if (showState || errorOnSave) {
      setTimeout(() => {
        if (errorOnSave) {
          setErrorOnSave(false);
        } else {
          setShowState(false);
        }
      }, 3000);
    }
  }, [showState, errorOnSave]);
  return (
    <header className="flex justify-end p-1 bg-slate-200">
      {errorOnSave && (
        <button className="mx-auto border-[1.5px] border-red-300 bg-red-300 cursor-pointer rounded-md px-4 py-1  text-sm">
          Cannot Save Flow
        </button>
      )}
      {showState && (
        <button className="mx-auto border-[1.5px] border-green-300 bg-green-300 cursor-pointer rounded-md px-4 py-1  text-sm">
          Saved
        </button>
      )}
      <button
        onClick={() => {
          const emptyTarget = collectAllDisconnectedNodes();
          setErrorOnSave(emptyTarget ? true : false);
          setShowState(emptyTarget ? false : true);
        }}
        className="border-[1.5px] border-blue-600 bg-white cursor-pointer rounded-md px-4 py-1 mr-10 text-sm"
      >
        Save Changes
      </button>
    </header>
  );
}

export default header;
