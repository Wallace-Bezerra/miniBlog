import { createContext, useState } from "react"

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return <MenuContext.Provider value={{ menuIsOpen, setMenuIsOpen }}>
        {children}
    </MenuContext.Provider>
}