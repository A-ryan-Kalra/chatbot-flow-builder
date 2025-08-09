import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./dnd-context";

import DnDFlow from "./drag-drop-flow";

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
          <DnDFlow />
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
}

export default ReactFlowProviderEl;
