import { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  return (
    <MenuContext.Provider
      value={{ menuIsOpen, setMenuIsOpen, ModalIsOpen, setModalIsOpen }}
    >
      {children}
    </MenuContext.Provider>
  );
};
