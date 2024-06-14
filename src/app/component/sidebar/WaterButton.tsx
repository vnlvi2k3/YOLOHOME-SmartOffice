import { motion } from "framer-motion";
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
  water: boolean;
  setWater: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WaterButton({ water, setWater }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetLast("led");
      setWater(result.value === "1" || result.value === "2");
      setLoading(false);
    };

    fetchData();
  }, [setWater]);

  const handleButtonClick = () => {
    const newWaterState = water ? "3" : "2";
    setWater(!water);
    Create("water", newWaterState);
  };

  if (loading) {
    return (
      <motion.form
        className="bg-white rounded-xl flex flex-col gap-10 justify-center items-center relative brightness-50 cursor-not-allowed"
        variants={SectionVars}
      >
        <Image
          src="/icon/watering-can-4-svgrepo-com.svg"
          alt="water can"
          width={90}
          height={90}
        />
        <button
          className="absolute lg:bottom-2 bottom-0 w-full h-full lg:w-fit lg:h-fit cursor-not-allowed"
          type="button"
          disabled
        >
          <Image
            className="hidden lg:block"
            src="/icon/off-rounded-svgrepo-com.svg"
            alt="water on/off"
            width={50}
            height={90}
          />
        </button>
      </motion.form>
    );
  }

  return (
    <motion.form
      className={`${
        water ? "bg-blue-200" : "bg-white"
      } rounded-xl flex flex-col gap-10 justify-center items-center relative`}
      variants={SectionVars}
    >
      <Image
        src="/icon/watering-can-4-svgrepo-com.svg"
        alt="water can"
        width={90}
        height={90}
      />
      <button
        className="absolute lg:bottom-2 bottom-0 w-full h-full lg:w-fit lg:h-fit"
        type="button"
        onClick={handleButtonClick}
      >
        <Image
          className="hidden lg:block"
          src={
            water
              ? "/icon/on-rounded-svgrepo-com.svg"
              : "/icon/off-rounded-svgrepo-com.svg"
          }
          alt="water on/off"
          width={50}
          height={90}
        />
      </button>
    </motion.form>
  );
}
