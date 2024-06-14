import React from "react";
import { TypeAnimation } from "react-type-animation";

const getTextColor = (bgColor: string) => {
  if (bgColor.includes("blue") && !bgColor.includes("blue-400"))
    return "text-black";
  if (
    bgColor.includes("blue") ||
    bgColor.includes("amber") ||
    bgColor.includes("neutral")
  )
    return "text-white";
  if (bgColor.includes("yellow")) return "text-black";
  return "text-white"; // Default to white for other dark backgrounds
};

// Function to determine the background color based on temperature
// Function to determine the background color based on temperature
const getTemperatureBgColor = (temp: number) => {
  if (temp <= 0) return "bg-blue-300";       // Cold temperatures
  if (temp > 0 && temp <= 15) return "bg-blue-200";  // Cool temperatures
  if (temp > 15 && temp <= 30) return "bg-yellow-300"; // Mild temperatures
  if (temp > 30 && temp <= 40) return "bg-orange-400"; // Warm temperatures
  return "bg-red-600";                        // Hot temperatures
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
  if (light > 50 && light <= 75) return "";
  if (light > 75 && light <= 100) return "bg-yellow-200";
  return "bg-yellow-500";
};

const getTemperatureAdvice = (temp: number) => {
  if (temp <= 15)
    return "The temperature is quite low. It's a good idea to turn up the heating for a more comfortable workspace.";
  if (temp > 15 && temp <= 20)
    return "It's slightly cool in the office. A slight increase in heating could enhance comfort.";
  if (temp > 20 && temp <= 24)
    return "The temperature is currently ideal for office productivity.";
  if (temp > 24 && temp <= 26)
    return "It's a bit warm. Adjusting the air conditioning could help maintain optimal comfort.";
  return "It's overly warm in the office. Cooling down the space is recommended to ensure comfort.";
};

const getMoistureAdvice = (moisture: number) => {
  if (moisture <= 30)
    return "Outdoor humidity is low, the air may be dry. Remember to bring moisturizer.";
  if (moisture > 30 && moisture <= 50)
    return "Outdoor humidity is at an ideal level. It's pleasant weather to be outside.";
  if (moisture > 50 && moisture <= 70)
    return "Outdoor humidity is high. It might feel a bit muggy, be prepared for damp conditions.";
  if (moisture > 70 && moisture <= 85)
    return "Outdoor humidity is very high. There's a good chance of rain, don't forget an umbrella.";
  return "Extremely high humidity! Heavy rain is very likely, carrying an umbrella and a raincoat is a good idea.";
};


const getSoilMoistureAdvice = (soilMoisture: number) => {
  if (soilMoisture <= 20)
    return "Soil moisture is too low! Consider watering your plants.";
  if (soilMoisture > 20 && soilMoisture <= 40)
    return "Soil moisture is low! Monitor your plants for dryness.";
  if (soilMoisture > 40 && soilMoisture <= 60)
    return "Soil moisture is within the optimal range.";
  if (soilMoisture > 60 && soilMoisture <= 80)
    return "Soil moisture is high! Avoid overwatering.";
  return "Soil moisture is too high! Ensure proper drainage.";
};

const getLightAdvice = (light: number) => {
  if (light <= 25)
    return "Light intensity is too low for effective work! Consider increasing office lighting for better visibility and comfort.";
  if (light > 25 && light <= 50)
    return "Light intensity is on the lower side. It's acceptable but might strain the eyes over long periods.";
  if (light > 50 && light <= 75)
    return "Light intensity is optimal for office work.";
  if (light > 75 && light <= 100)
    return "Light intensity is slightly high. Ensure it's comfortable for everyone and adjust if necessary.";
  return "Light intensity is too high for office comfort! Consider dimming lights or using shades to reduce glare.";
};

const getAdvice = (record: StateRecord) => {
  const temperatureAdvice = getTemperatureAdvice(record.data.temperature);
  const moistureAdvice = getMoistureAdvice(record.data.moisture);
  const soilMoistureAdvice = getSoilMoistureAdvice(record.data.soilmoisture);
  const lightAdvice = getLightAdvice(record.data.light);

  return (
    <div className="p-4">
      <div
        className={`p-2 mb-2 ${getTemperatureBgColor(
          record.data.temperature
        )} ${
          getTemperatureBgColor(record.data.temperature)
            ? getTextColor(getTemperatureBgColor(record.data.temperature))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[temperatureAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
      <div
        className={`p-2 mb-2 ${getMoistureBgColor(record.data.moisture)} ${
          getMoistureBgColor(record.data.moisture)
            ? getTextColor(getMoistureBgColor(record.data.moisture))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[moistureAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
      {/* <div
        className={`p-2 mb-2 ${getSoilMoistureBgColor(
          record.data.soilmoisture
        )} ${
          getSoilMoistureBgColor(record.data.soilmoisture)
            ? getTextColor(getSoilMoistureBgColor(record.data.soilmoisture))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[soilMoistureAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div> */}
      <div
        className={`p-2 mb-2 ${getLightBgColor(record.data.light)} ${
          getLightBgColor(record.data.light)
            ? getTextColor(getLightBgColor(record.data.light))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[lightAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
    </div>
  );
};

export default getAdvice;
