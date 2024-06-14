import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import GetLast from "../../../../action/GetLast";
import Create from "../../../../action/Create";

const SectionVars = {
  initial: {
    x: 10,
    y: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: {
    x: 10,
    y: 10,
    opacity: 0,
  },
};

type Props = {
  led: boolean;
  setLed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LedButton({ led, setLed }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await GetLast("led");
      setLed(result.value === "1" || result.value === "0");
      setLoading(false);
    };

    fetchData();
  }, [setLed]);

  if (loading) {
    return (
      <motion.form
        className="bg-white rounded-xl flex flex-col gap-10 justify-center items-center relative brightness-50 cursor-not-allowed"
        variants={SectionVars}
      >
        <Image
          src="/icon/flashlight-svgrepo-com.svg"
          alt="led"
          width={90}
          height={90}
        />
        <button
          className="absolute lg:bottom-2 bottom-0 w-full h-full lg:w-fit lg:h-fit cursor-not-allowed"
          disabled
        >
          <Image
            className="hidden lg:block"
            src="/icon/off-rounded-svgrepo-com.svg"
            alt="led on/off"
            width={50}
            height={90}
          />
        </button>
      </motion.form>
    );
  }

  const handleToggle = () => {
    const newLedState = led ? "0" : "1";
    setLed(!led);
    Create("led", newLedState);
  };

  return (
    <motion.form
      className={`${
        led ? "bg-yellow-400" : "bg-white"
      } rounded-xl flex flex-col gap-10 justify-center items-center relative`}
      variants={SectionVars}
    >
      <Image
        src="/icon/flashlight-svgrepo-com.svg"
        alt="led"
        width={90}
        height={90}
      />
      <button
        type="button"
        className="absolute lg:bottom-2 bottom-0 w-full h-full lg:w-fit lg:h-fit"
        onClick={handleToggle}
      >
        <Image
          className="hidden lg:block"
          src={
            led
              ? "/icon/on-rounded-svgrepo-com.svg"
              : "/icon/off-rounded-svgrepo-com.svg"
          }
          alt="led on/off"
          width={50}
          height={90}
        />
      </button>
    </motion.form>
  );
}
