"use client";
import GridLayout from "../component/GridLayout";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import GetLast from "../../../action/GetLast";
import { setCookie } from "cookies-next";
import CreateRecord from "../../../action/CreateRecord";

const initialState = {
  controlState: {
    water: "0",
    led: "0",
    fan: {
      state: "0",
      velocity: 0,
    },
  },
  numberState: {
    temperature: 0,
    moisture: 0,
    soilmoisture: 0,
    light: 0,
  },
  user: {
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  },
  priority: false,
};

export default function DashBoardMain() {
  useEffect(() => {
    // Get initial user state from cookies
    const user = getCookie("user")
      ? JSON.parse(getCookie("user") as string)
      : initialState.user;

    // Define all required data fetch promises
    const fetchPromises = [
      GetLast("led"),
      GetLast("led"),
      GetLast("fan"),
      GetLast("fanspeed"),
      GetLast("temperature"),
      GetLast("moisture"),
      GetLast("moisture"),
      GetLast("light"),
      GetLast("priority"),
    ];

    Promise.all(fetchPromises).then((results) => {
      const [
        water,
        led,
        fan,
        fanspeed,
        temperature,
        moisture,
        soilmoisture,
        light,
        priority,
      ] = results;

      // Update control states
      const controlState = {
        water: water.value,
        led: led.value,
        fan: {
          state: fan.value,
          velocity: Number(fanspeed.value),
        },
      };
      setCookie("cs", JSON.stringify(controlState));

      // Update number states
      const numberState = {
        temperature: Number(temperature.value),
        moisture: Number(moisture.value),
        soilmoisture: Number(soilmoisture.value),
        light: Number(light.value),
      };
      setCookie("ns", JSON.stringify(numberState));

      // Update priority
      const priorityState = priority.value === "1";
      setCookie("priority", priorityState);

      // Create record
      CreateRecord(controlState, priorityState, numberState, user.uid);
    });
    console.log("request from mainboard 1")
  }, []);

  useEffect(() => {
    const refreshRate = Number(process.env.NEXT_PUBLIC_REFRESH_RATE) || 60000; // Default to 5000ms if not defined

    const intervalId = setInterval(() => {
      Promise.all([
        GetLast("led"),
        GetLast("led"),
        GetLast("fan"),
        GetLast("fanspeed"),
        GetLast("temperature"),
        GetLast("moisture"),
        GetLast("moisture"),
        GetLast("light"),
        GetLast("priority"),
      ])
        .then((results) => {
          const [
            water,
            led,
            fan,
            fanspeed,
            temperature,
            moisture,
            soilmoisture,
            light,
            priority,
          ] = results;

          console.log(results);

          // Update states
          const controlState = {
            water: water.value,
            led: led.value,
            fan: {
              state: fan.value,
              velocity: Number(fanspeed.value),
            },
          };
          const numberState = {
            temperature: Number(temperature.value),
            moisture: Number(moisture.value),
            soilmoisture: Number(soilmoisture.value),
            light: Number(light.value),
          };
          const priorityState = priority.value === "1";

          // Get user from cookies or use initial state
          const user = getCookie("user")
            ? JSON.parse(getCookie("user") as string)
            : initialState.user;

          // Create record
          CreateRecord(controlState, priorityState, numberState, user.uid);

          // Optionally set states in cookies
          setCookie("cs", JSON.stringify(controlState));
          setCookie("ns", JSON.stringify(numberState));
          setCookie("priority", priorityState);
        })
        .catch((error) => {
          console.error("Failed to fetch or process data:", error);
        });
    }, refreshRate);
    console.log("request from mainboard")
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  let user;
  if (getCookie("user")) {
    user = JSON.parse(getCookie("user") as string);
  }

  return (
    <>
      {user && <GridLayout />}
      {!user && (
        <main className=" h-screen w-screen flex justify-center items-center">
          <Image
            src="/required.png"
            alt="bb warned you"
            width={500}
            height={500}
          />
        </main>
      )}
    </>
  );
}
