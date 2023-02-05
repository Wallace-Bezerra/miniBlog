import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

export const useMenuIsOpen = () => {
    const menu = useContext(MenuContext);
    return { menu }
}