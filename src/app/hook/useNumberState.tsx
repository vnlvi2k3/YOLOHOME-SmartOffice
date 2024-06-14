import { useContext } from "react";
import { NumberStateContext } from "../context/numberStateContext";

const useNumberState = () => {
  return useContext(NumberStateContext);
};

export default useNumberState;
