import { createContext, useContext, useState } from "react";

type SaveContextType = { saveState: boolean; toggleChanges: () => void };
const SaveChangesContext = createContext<SaveContextType>({
  saveState: false,
  toggleChanges: () => {},
});

export const useSaveChanges = () => {
  return useContext(SaveChangesContext);
};

function SaveContextProvider({ children }: { children: React.ReactNode }) {
  const [saveChanges, setSaveChanges] = useState<boolean>(false);

  const toggleChanges = () => {
    setSaveChanges((prev) => !prev);
  };

  return (
    <SaveChangesContext.Provider
      value={{ saveState: saveChanges, toggleChanges }}
    >
      {children}
    </SaveChangesContext.Provider>
  );
}

export default SaveContextProvider;
