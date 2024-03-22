import { useContext } from "react";
import { GlobalContext } from "../components/shared/GlobalContext";

export const useGlobalState = () => useContext(GlobalContext);
