import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{ menuIsOpen, setMenuIsOpen, ModalIsOpen, setModalIsOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};
