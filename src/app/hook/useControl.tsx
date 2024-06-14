import { useContext } from "react";
import { ControlContext } from "../context/controlContext";

const useControl = () => {
  return useContext(ControlContext);
};

export default useControl;
