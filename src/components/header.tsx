import { useSaveChanges } from "./provider/save-context-provider";

function header() {
  const { toggleChanges } = useSaveChanges();
  return (
    <header className="flex justify-end p-1 bg-slate-200">
      <button
        onClick={() => toggleChanges()}
        className="border-[1.5px] border-blue-600 bg-white cursor-pointer rounded-md px-4 py-1 mr-10 text-sm"
      >
        Save Changes
      </button>
    </header>
  );
}

export default header;
