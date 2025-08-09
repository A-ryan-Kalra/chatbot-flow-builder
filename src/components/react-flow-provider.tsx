import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./dnd-context";
import Header from "./header";
import DnDFlow from "./drag-drop-flow";
import SaveContextProvider from "./provider/save-context-provider";

function ReactFlowProviderEl() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        // overflow: "hidden",
      }}
    >
      <ReactFlowProvider>
        <DnDProvider>
          <SaveContextProvider>
            <Header />
            <DnDFlow />
          </SaveContextProvider>
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
}

export default ReactFlowProviderEl;
