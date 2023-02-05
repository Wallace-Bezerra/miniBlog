import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useAppContext = () => {
    const app = useContext(AppContext);
    return { app }
}