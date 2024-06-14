import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";
import Create from "../../../action/Create";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { motion } from "framer-motion";

const ControlButton = () => {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  const pathname = usePathname();

  const initialPriority = useMemo(() => {
    return getCookie("priority") ? getCookie("priority") === "true" : false;
  }, []);

  useEffect(() => {
    setcontrolContext(initialPriority);
  }, [initialPriority, setcontrolContext]);

  const handleControlToggle = useCallback(
    (newValue: boolean) => {
      toast.remove();
      Create("priority", newValue ? 1 : 0);
      setcontrolContext(newValue);
      setCookie("priority", newValue);
    },
    [setcontrolContext]
  );

  const renderConfirmationDialog = useCallback(
    (isManualControl: boolean) => (
      <div className="flex flex-col items-center gap-5">
        <div>
          {isManualControl
            ? "The system is on autopilot mode, are you sure want to control it manually?"
            : "Are you sure want to turn on the autopilot mode?"}
        </div>
        <div className="flex gap-10">
          <button
            className="bg-red-600 rounded-xl p-2"
            onClick={() => handleControlToggle(!controlContext)}
          >
            Yes
          </button>
          <button
            className="bg-green-600 rounded-xl p-2"
            onClick={() => toast.remove()}
          >
            No
          </button>
        </div>
      </div>
    ),
    [controlContext, handleControlToggle]
  );

  const handleFormSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      toast(renderConfirmationDialog(!controlContext), {
        id: "control",
      });
    },
    [controlContext, renderConfirmationDialog]
  );

  return (
    <>
      {pathname === "/dashboard" && (
        <form onSubmit={handleFormSubmit}>
          <motion.button
            className="lg:hidden flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <Image
              src="/icon/control-multimedia-player-svgrepo-com.svg"
              alt="control"
              width={25}
              height={25}
            />
          </motion.button>
          <motion.button
            className="lg:flex hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <Image
              src="/icon/control-multimedia-player-svgrepo-com.svg"
              alt="control"
              width={35}
              height={35}
            />
          </motion.button>
        </form>
      )}
    </>
  );
};

export default ControlButton;
