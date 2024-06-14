"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  record: StateRecord;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const LVars = {
  initial: {
    x: -1000,
    y: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ease: "linear",
    },
  },
  exit: {
    x: -1000,
    y: 0,
    opacity: 0,
  },
};

const RVars = {
  initial: {
    x: 1000,
    y: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ease: "linear",
    },
  },
  exit: {
    x: 1000,
    y: 0,
    opacity: 0,
  },
};

import getAdvice from "./getAdvice"; // Import the getAdvice function

export default function RecordView({ record, setClicked }: Props) {
  const handleClose = () => {
    setClicked(false);
  };

  return (
    <section className="flex absolute top-0 right-0 w-screen h-screen">
      {/* Close button for desktop */}
      <section className="absolute top-2 right-2 z-50 lg:block hidden">
        <motion.button whileHover={{ scale: 1.3 }} onClick={handleClose}>
          <Image
            src="/icon/cross-svgrepo-com.svg"
            alt="close"
            width={40}
            height={40}
          />
        </motion.button>
      </section>
      {/* Close button for mobile */}
      <section className="lg:hidden absolute top-2 right-2 z-50">
        <motion.button whileHover={{ scale: 1.3 }} onClick={handleClose}>
          <Image
            src="/icon/cross-svgrepo-com.svg"
            alt="close"
            width={30}
            height={30}
          />
        </motion.button>
      </section>

      <motion.section
        className="bg-white flex-grow p-5 rounded-l-xl w-full lg:h-full h-fit flex justify-center flex-col z-40 mx-auto absolute top-0 right-0"
        variants={RVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex justify-center items-center">
          <h1 className="text-4xl font-bold py-4 lg:block hidden">
            {record.id} - {record.data.mode ? "Manual" : "Autopilot"}
          </h1>
          <h1 className="text-xl font-bold pb-4 w-full lg:hidden block text-center">
            {record.id} <br />
            {record.data.mode ? "Manual" : "Autopilot"}
          </h1>
        </div>
        <section className="lg:flex lg:justify-center lg:flex-row lg:gap-10 flex flex-col-reverse">
          <section className="lg:flex bg-white justify-center lg:w-3/5 h-full z-40">
            <div className="lg:text-xl text-xl font-mono mt-10">
              <p className="lg:text-4xl font-bold text-center">Advice</p>
              {getAdvice(record)}
            </div>
          </section>
          <section className="mt-10 lg:w-96">
            {/* Environment information */}
            <div className="lg:text-3xl text-xl font-mono pb-4 text-center lg:text-left">
              <p className="lg:text-4xl font-bold text-center">Environment</p>
              <p>Temperature: {record.data.temperature}°C</p>
              <p>Moisture: {record.data.moisture}%</p>
              <p>Light: {record.data.light}lx</p>
            </div>
            {/* Device status */}
            <div className="lg:text-3xl text-xl font-mono text-center lg:text-left">
              <p className="lg:text-4xl font-bold text-center">Device Status</p>
              <p>Fan: {record.data.fan ? "On" : "Off"}</p>
              <p>Fan Speed: {record.data.fanspeed}</p>
              <p>LED: {record.data.led ? "On" : "Off"}</p>
            </div>
          </section>
        </section>
      </motion.section>
    </section>
  );
}
