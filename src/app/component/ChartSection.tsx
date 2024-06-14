"use client";
import { motion, AnimatePresence, delay } from "framer-motion";
import TemperatureChart from "../chart/TemperatureChart";
import MoistureChart from "../chart/MoistureChart";
import LightChart from "../chart/LightChart";
import { useState } from "react";
import Image from "next/image";
import ControlButton from "./ControlButton";
import SignOutButton from "./SignOutButton";
import RecordButton from "./RecordButton";

const ChartVars = {
  initial: {
    x: -20,
    y: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.7,
    },
  },
  exit: {
    x: -20,
    y: 0,
    opacity: 0,
  },
};

export default function ChartSection() {
  const [chart, setChart] = useState(0);
  const moveLeft = () => {
    setChart((chart - 1 + 3) % 3);
  };
  const moveRight = () => {
    setChart((chart + 1) % 3);
  };
  return (
    <motion.section
      id="canvas"
      className="chartArea bg-slate-100 lg:ml-10 rounded-xl mb-10 lg:flex lg:justify-center lg:items-center lg:gap-5 my-2"
      variants={ChartVars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.button
        onClick={() => moveLeft()}
        className="lg:flex hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
      >
        <Image
          src="/icon/left-chevron-svgrepo-com.svg"
          alt="move left"
          width={50}
          height={50}
        />
      </motion.button>
      {chart === 0 && <TemperatureChart />}
      {chart === 1 && <MoistureChart />}
      {chart === 2 && <LightChart />}
      <section className="flex justify-evenly lg:hidden items-center">
        <motion.button
          onClick={() => moveLeft()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        >
          <Image
            src="/icon/left-chevron-svgrepo-com.svg"
            alt="move left"
            width={50}
            height={50}
          />
        </motion.button>
        <ControlButton />
        <RecordButton />
        <SignOutButton />
        <motion.button
          onClick={() => moveRight()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        >
          <Image
            src="/icon/right-chevron-svgrepo-com.svg"
            alt="move right"
            width={50}
            height={50}
          />
        </motion.button>
      </section>
      <motion.button
        onClick={() => moveRight()}
        className="lg:flex hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
      >
        <Image
          src="/icon/right-chevron-svgrepo-com.svg"
          alt="move right"
          width={50}
          height={50}
        />
      </motion.button>
    </motion.section>
  );
}
