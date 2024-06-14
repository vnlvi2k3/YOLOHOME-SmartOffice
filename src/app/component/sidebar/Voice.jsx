"use client";
import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Image from "next/image";
import { motion } from "framer-motion";
import Create from "../../../../action/Create";
import toast from "react-hot-toast";

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

const Dictaphone = ({ led, setLed, water, setWater, fan, setFan }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const processTranscript = (transcript) => {
    transcript = transcript.toLowerCase();

    // Turn on all features
    if (
      transcript.includes("turn on all") ||
      transcript.includes("activate all") ||
      transcript.includes("enable all") ||
      transcript.includes("bật tất cả") ||
      transcript.includes("mở tất cả") ||
      transcript.includes("mở hết") ||
      transcript.includes("bật hết")
    ) {
      if (fan.state && led) {
        toast.error("All features are already on", { id: "allAlreadyOn" });
      } else {
        toast("🚀 All features on", { id: "allOn" });
        if (!fan.state) {
          Create("fan", "1");
          Create("fanspeed", 50);
          setFan({
            state: true,
            velocity: 50,
          });
        }
        if (!led) {
          Create("led", "1");
          setLed(true);
        }
      }
      resetTranscript();
    }

    // Turn off all features
    if (
      transcript.includes("turn off all") ||
      transcript.includes("deactivate all") ||
      transcript.includes("disable all") ||
      transcript.includes("tắt tất cả") ||
      transcript.includes("ngừng tất cả") ||
      transcript.includes("tắt hết") ||
      transcript.includes("ngừng hết")
    ) {
      if (!fan.state && !led) {
        toast.error("All features are already off", { id: "allAlreadyOff" });
      } else {
        toast("🛑 All features off", { id: "allOff" });
        if (fan.state) {
          Create("fan", "0");
          Create("fanspeed", 0);
          setFan({
            state: false,
            velocity: 0,
          });
        }
        if (led) {
          Create("led", "0");
          setLed(false);
        }
      }
      resetTranscript();
    }

    // Fan control
    if (
      transcript.includes("mở quạt") ||
      transcript.includes("bật quạt") ||
      transcript.includes("khởi động quạt") ||
      transcript.includes("quạt chạy") ||
      transcript.includes("bật máy quạt") ||
      transcript.includes("turn on fan") ||
      transcript.includes("start fan") ||
      transcript.includes("activate fan") ||
      transcript.includes("fan on") ||
      transcript.includes("enable fan") ||
      transcript.includes("fan start") ||
      transcript.includes("fan activate") ||
      transcript.includes("fan enable") ||
      transcript.includes("power on fan") ||
      transcript.includes("initiate fan") ||
      transcript.includes("fan power on") ||
      transcript.includes("fan initiate") ||
      transcript.includes("quạt hoạt động") ||
      transcript.includes("chạy quạt")
    ) {
      if (fan.state) {
        toast.error("Fan is already on", { id: "fanAlreadyOn" });
      } else {
        toast("🍃 Fan on", { id: "fanon" });
        Create("fan", "2");
        Create("fanspeed", 50);
        setFan({
          state: true,
          velocity: 50,
        });
      }
      resetTranscript();
    } else if (
      transcript.includes("tắt quạt") ||
      transcript.includes("dừng quạt") ||
      transcript.includes("ngừng quạt") ||
      transcript.includes("quạt tắt") ||
      transcript.includes("turn off fan") ||
      transcript.includes("stop fan") ||
      transcript.includes("disable fan") ||
      transcript.includes("fan off") ||
      transcript.includes("deactivate fan") ||
      transcript.includes("fan stop") ||
      transcript.includes("fan deactivate") ||
      transcript.includes("fan disable") ||
      transcript.includes("power off fan") ||
      transcript.includes("shutdown fan") ||
      transcript.includes("fan power off") ||
      transcript.includes("fan shutdown")
    ) {
      if (!fan.state) {
        toast.error("Fan is already off", { id: "fanAlreadyOff" });
      } else {
        toast("Fan off", { id: "fanoff" });
        Create("fan", "0");
        Create("fanspeed", 0);
        setFan({
          state: false,
          velocity: 0,
        });
      }
      resetTranscript();
    }

    if (
      transcript.includes("tăng tốc độ quạt") ||
      transcript.includes("tăng quạt") ||
      transcript.includes("tăng tốc quạt") ||
      transcript.includes("increase fan speed") ||
      transcript.includes("fan faster") ||
      transcript.includes("speed up fan") ||
      transcript.includes("boost fan speed") ||
      transcript.includes("quạt nhanh hơn") ||
      transcript.includes("quạt tăng tốc") ||
      transcript.includes("fan speed up") ||
      transcript.includes("quạt mạnh lên")
    ) {
      if (!fan.state) {
        toast.error("Please turn on the fan first", {
          style: {
            backgroundColor: "white",
            color: "black",
          },
        });
      } else {
        const velocity = fan.velocity + 10 >= 100 ? 100 : fan.velocity + 10;
        toast("⏫ Fan speed increased", { id: "speed" });
        setFan({ ...fan, velocity: velocity });
        Create("fanspeed", velocity);
      }
      resetTranscript();
    } else if (
      transcript.includes("giảm tốc độ quạt") ||
      transcript.includes("giảm quạt") ||
      transcript.includes("giảm tốc quạt") ||
      transcript.includes("decrease fan speed") ||
      transcript.includes("fan slower") ||
      transcript.includes("slow down fan") ||
      transcript.includes("reduce fan speed") ||
      transcript.includes("quạt chậm lại") ||
      transcript.includes("quạt giảm tốc") ||
      transcript.includes("fan slow down") ||
      transcript.includes("quạt yếu đi")
    ) {
      if (!fan.state) {
        toast.error("Please turn on the fan first", {
          style: {
            backgroundColor: "white",
            color: "black",
          },
        });
      } else {
        const velocity = fan.velocity - 10 <= 10 ? 10 : fan.velocity - 10;
        toast("⏫ Fan speed decreased", { id: "speed" });
        setFan({ ...fan, velocity: velocity });
        Create("fanspeed", velocity);
      }
      resetTranscript();
    }

    // Watering system control
    if (
      transcript.includes("mở nước") ||
      transcript.includes("bật nước") ||
      transcript.includes("tưới nước") ||
      transcript.includes("khởi động nước") ||
      transcript.includes("turn on water") ||
      transcript.includes("start watering") ||
      transcript.includes("activate watering") ||
      transcript.includes("water on") ||
      transcript.includes("bật tưới nước") ||
      transcript.includes("quạt nước") ||
      transcript.includes("chạy nước") ||
      transcript.includes("start water") ||
      transcript.includes("water activate") ||
      transcript.includes("enable watering") ||
      transcript.includes("power on water") ||
      transcript.includes("initiate watering")
    ) {
      if (water) {
        toast.error("Watering is already on", { id: "waterAlreadyOn" });
      } else {
        toast("💧Watering", {
          style: {
            backgroundColor: "rgb(191,219,254)",
          },
          id: "wateron",
        });
        setWater(true);
        Create("water", "2");
      }
      resetTranscript();
    } else if (
      transcript.includes("tắt nước") ||
      transcript.includes("ngừng nước") ||
      transcript.includes("dừng nước") ||
      transcript.includes("quạt nước tắt") ||
      transcript.includes("turn off water") ||
      transcript.includes("stop watering") ||
      transcript.includes("disable watering") ||
      transcript.includes("water off") ||
      transcript.includes("deactivate watering") ||
      transcript.includes("water stop") ||
      transcript.includes("water deactivate") ||
      transcript.includes("water disable") ||
      transcript.includes("power off water") ||
      transcript.includes("shutdown water") ||
      transcript.includes("water power off") ||
      transcript.includes("water shutdown")
    ) {
      if (!water) {
        toast.error("Watering is already off", { id: "waterAlreadyOff" });
      } else {
        toast("Stop watering", {
          style: {
            backgroundColor: "rgb(191,219,254)",
          },
          id: "wateroff",
        });
        setWater(false);
        Create("water", "3");
      }
      resetTranscript();
    }

    // LED lighting system control
    if (
      transcript.includes("mở đèn") ||
      transcript.includes("bật đèn") ||
      transcript.includes("khởi động đèn") ||
      transcript.includes("turn on lights") ||
      transcript.includes("start lights") ||
      transcript.includes("activate lights") ||
      transcript.includes("lights on") ||
      transcript.includes("bật đèn led") ||
      transcript.includes("đèn sáng") ||
      transcript.includes("turn on led") ||
      transcript.includes("start led") ||
      transcript.includes("light start") ||
      transcript.includes("light activate") ||
      transcript.includes("enable lights") ||
      transcript.includes("power on lights") ||
      transcript.includes("initiate lights") ||
      transcript.includes("đèn bật") ||
      transcript.includes("đèn led chạy")
    ) {
      if (led) {
        toast.error("Light is already on", { id: "lightAlreadyOn" });
      } else {
        toast("🔦Light on", {
          style: {
            backgroundColor: "rgb(250,204,21)",
          },
          id: "lighton",
        });
        setLed(true);
        Create("led", "1");
      }
      resetTranscript();
    } else if (
      transcript.includes("tắt đèn") ||
      transcript.includes("dừng đèn") ||
      transcript.includes("ngừng đèn") ||
      transcript.includes("turn off lights") ||
      transcript.includes("stop lights") ||
      transcript.includes("disable lights") ||
      transcript.includes("lights off") ||
      transcript.includes("deactivate lights") ||
      transcript.includes("light stop") ||
      transcript.includes("light deactivate") ||
      transcript.includes("light disable") ||
      transcript.includes("power off lights") ||
      transcript.includes("shutdown lights") ||
      transcript.includes("lights power off") ||
      transcript.includes("lights shutdown") ||
      transcript.includes("đèn tắt") ||
      transcript.includes("đèn led tắt")
    ) {
      if (!led) {
        toast.error("Light is already off", { id: "lightAlreadyOff" });
      } else {
        toast("Light off", {
          style: {
            backgroundColor: "rgb(250,204,21)",
          },
          id: "lightoff",
        });
        setLed(false);
        Create("led", "0");
      }
      resetTranscript();
    }
  };

  useEffect(() => {
    processTranscript(transcript);
  }, [transcript]);

  const startListen = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <motion.section
      className={
        (listening ? "bg-green-500" : "bg-white") +
        " rounded-xl flex flex-col gap-10 justify-center items-center relative"
      }
      variants={SectionVars}
    >
      <Image src="/icon/voice-tools-svgrepo-com.svg" alt="fan" width={90} height={90} />
      <button
        onClick={listening ? SpeechRecognition.stopListening : startListen}
        className="absolute lg:bottom-2 bottom-0 w-full h-full lg:w-fit lg:h-fit"
      >
        <Image
          className="hidden lg:block"
          src={listening ? "/icon/on-rounded-svgrepo-com.svg" : "/icon/off-rounded-svgrepo-com.svg"}
          alt="on - off"
          width={50}
          height={90}
        />
      </button>
    </motion.section>
  );
};

export default Dictaphone;
