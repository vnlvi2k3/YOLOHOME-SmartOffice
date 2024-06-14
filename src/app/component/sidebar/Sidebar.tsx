import React, { useEffect, useState } from "react";
import Image from "next/image";
import useControl from "../../hook/useControl";
import { ControlContextType } from "../../context/controlContext";
import { motion, AnimatePresence } from "framer-motion";
import NumberState from "./NumberState";
import Dictaphone from "./Voice";
import LedButton from "./LedButton";
import WaterButton from "./WaterButton";
import FanButton from "./FanButton";
import GetLast from "../../../../action/GetLast";
import { Toaster } from "react-hot-toast";

const SidebarVars = {
  initital: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.7,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      staggerDirection: -1,
    },
  },
};

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

export default function Sidebar() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;

  const [t, setT] = useState(0);
  const [m, setM] = useState(0);
  const [sm, setSM] = useState(0);
  const [l, setL] = useState(0);

  const [led, setLed] = useState(false);
  const [water, setWater] = useState(false);
  const [fan, setFan] = useState<fanState>({ state: false, velocity: 0 });

  const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async () => {
    const result = await GetLast("priority");
    if (result.value === "1") setcontrolContext(true);
    else setcontrolContext(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to determine the background color based on temperature
  const getTemperatureBgColor = (temp: number) => {
    if (temp <= 0) return "bg-blue-300";
    if (temp > 0 && temp <= 15) return "bg-blue-100";
    if (temp > 15 && temp <= 30) return "bg-red-200";
    if (temp > 30 && temp <= 40) return "bg-red-400";
    return "bg-red-600";
  };

  // Function to determine the background color based on moisture
  const getMoistureBgColor = (moisture: number) => {
    if (moisture <= 20) return "bg-blue-50";
    if (moisture > 20 && moisture <= 40) return "bg-blue-100";
    if (moisture > 40 && moisture <= 60) return "bg-blue-200";
    if (moisture > 60 && moisture <= 80) return "bg-blue-300";
    return "bg-blue-400";
  };

  // Function to determine the background color based on soil moisture
  const getSoilMoistureBgColor = (soilMoisture: number) => {
    if (soilMoisture <= 20) return "bg-amber-600";
    if (soilMoisture > 20 && soilMoisture <= 40) return "bg-amber-700";
    if (soilMoisture > 40 && soilMoisture <= 60) return "bg-amber-800";
    if (soilMoisture > 60 && soilMoisture <= 80) return "bg-amber-900";
    return "bg-amber-950";
  };

  // Function to determine the background color based on light
  const getLightBgColor = (light: number) => {
    if (light <= 25) return "bg-neutral-900";
    if (light > 25 && light <= 50) return "bg-neutral-400";
    if (light > 50 && light <= 75) return "bg-slate-50";
    if (light > 75 && light <= 100) return "bg-yellow-200";
    return "bg-yellow-500";
  };

  return (
    <>
      <AnimatePresence>
        {!controlContext && (
          <motion.aside
            className="SidebarArea grid rounded-xl mx-10 mb-10 gap-5 justify-center"
            variants={SidebarVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Temperature Section */}
            <motion.section
              className={`${getTemperatureBgColor(
                t
              )} rounded-xl flex justify-center items-center relative overflow-hidden`}
              variants={SectionVars}
            >
              <div className=" absolute bottom-0 flex opacity-50">
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-300"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-100"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-red-200"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-red-400"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-red-600"></div>
              </div>
              <Image
                src="/icon/temperature-half-svgrepo-com.svg"
                alt="temperature"
                width={50}
                height={50}
                className=" absolute top-0 right-0"
              />
              <NumberState feed="temperature" n={t} setNumber={setT} />
            </motion.section>

            {/* Moisture Section */}
            <motion.section
              className={`${getMoistureBgColor(
                m
              )} rounded-xl flex justify-center items-center relative overflow-hidden`}
              variants={SectionVars}
            >
              <div className=" absolute bottom-0 flex opacity-50">
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-50"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-100"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-200"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-300"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-blue-400"></div>
              </div>
              <Image
                src="/icon/moisture-svgrepo-com.svg"
                alt="moisture"
                width={50}
                height={50}
                className=" absolute top-0 right-1"
              />
              <NumberState feed="moisture" n={m} setNumber={setM} />
            </motion.section>

            {/* Soil Moisture Section */}
            {/* <motion.section
              className={`${getSoilMoistureBgColor(
                sm
              )} rounded-xl flex justify-center items-center relative overflow-hidden`}
              variants={SectionVars}
            >
              <div className=" absolute bottom-0 flex opacity-50">
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-amber-600"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-amber-700"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-amber-800"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-amber-900"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-amber-950"></div>
              </div>
              <Image
                src="/icon/soil-moisture-svgrepo-com.svg"
                alt="soil moisture"
                width={50}
                height={50}
                className=" absolute top-0 right-2"
              />
              <NumberState feed="soilmoisture" n={sm} setNumber={setSM} />
            </motion.section> */}

            {/* Light Section */}
            <motion.section
              className={`${getLightBgColor(
                l
              )} rounded-xl flex justify-center items-center relative overflow-hidden`}
              variants={SectionVars}
            >
              <div className=" absolute bottom-0 flex opacity-50">
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-neutral-900"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-neutral-400"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-slate-50"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-yellow-200"></div>
                <div className=" w-7 h-8 lg:w-10 lg:h-10 bg-yellow-500"></div>
              </div>
              <Image
                src="/icon/light-svgrepo-com.svg"
                alt="light"
                width={50}
                height={50}
                className=" absolute top-0 right-1"
              />
              <NumberState feed="light" n={l} setNumber={setL} />
            </motion.section>
          </motion.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {controlContext && (
          <motion.aside
            className="SidebarArea grid rounded-xl mx-10 mb-10 gap-5 justify-center"
            variants={SidebarVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Fan Control Section */}
            <FanButton setCLoading={setLoading} fan={fan} setFan={setFan} />
            {/* Watering Section */}
            {/* <WaterButton water={water} setWater={setWater} /> */}
            {/* LED Section */}
            <LedButton led={led} setLed={setLed} />
            {/* Voice Control Section */}
            {!loading && (
              <Dictaphone
                led={led}
                setLed={setLed}
                water={water}
                setWater={setWater}
                fan={fan}
                setFan={setFan}
              />
            )}
          </motion.aside>
        )}
      </AnimatePresence>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 1000,
          style: {
            background: "#22c55e",
            color: "#fff",
          },
          success: {
            duration: 1000,
          },
          error: {
            duration: 1000,
          },
        }}
      />
    </>
  );
}
