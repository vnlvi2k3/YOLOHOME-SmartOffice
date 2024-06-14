import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import addData from "./addData";
import removeData from "./removeData";
import GetLast from "../../../action/GetLast";
import GetFeed from "../../../action/GetFeed";

function SoilMoistureChart() {
  const chartRef = useRef();
  const [soilMoistureData, setSoilMoistureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Soil Moisture",
        data: [],
        borderWidth: 2,
        tension: 0.3,
        fill: 'start',
        backgroundColor: ["rgb(133,77,14,1)"],
        borderColor: "brown",
        segment: {
          backgroundColor: ctx => getSegmentBackgroundColor(ctx.p0.parsed.y),
          borderColor: ctx => getSegmentBorderColor(ctx.p0.parsed.y),
        },
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetFeed("moisture");
      setSoilMoistureData({
        labels: result.map((data) => new Date(data.created_at).toLocaleTimeString()).reverse(),
        datasets: [
          {
            label: "Soil Moisture",
            data: result.map((data) => data.value).reverse(),
            borderWidth: 2,
            tension: 0.3,
            fill: 'start',
            segment: {
              backgroundColor: ctx => getSegmentBackgroundColor(ctx.p0.parsed.y),
              borderColor: ctx => getSegmentBorderColor(ctx.p0.parsed.y),
            },
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      GetLast("moisture").then((result) => {
        addData(
          chartRef.current,
          new Date(result.created_at).toLocaleTimeString(),
          result.value
        );
        removeData(chartRef.current);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25
          }
        }
      }
    }
  };

  const getSegmentBackgroundColor = (value) => {
    if (value <= 20) return "rgba(217,119,6,0.8)"; // very dry
    if (value > 20 && value <= 40) return "rgba(180,83,9,0.8)"; // dry
    if (value > 40 && value <= 60) return "rgba(146,64,14,0.8)"; // normal
    if (value > 60 && value <= 80) return "rgba(120,53,15,0.8)"; // moist
    return "rgba(120,53,15,0.8)"; // very moist
  };

  const getSegmentBorderColor = (value) => {
    if (value <= 20) return "rgb((217,119,6)"; // very dry
    if (value > 20 && value <= 40) return "rgb(180,83,9)"; // dry
    if (value > 40 && value <= 60) return "rgb(146,64,14)"; // normal
    if (value > 60 && value <= 80) return "rgb(120,53,15)"; // moist
    return "rgb(120,53,15)"; // very moist
  };

  return (
    <>
      <div className="flex lg:hidden md:hidden mt-5 m-2" style={{ width: "18rem", height: "20rem" }}>
        <Line data={soilMoistureData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden lg:hidden md:flex" style={{ width: "35rem", height: "25rem" }}>
        <Line data={soilMoistureData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden lg:flex md:hidden mt-5 m-2" style={{ width: "40rem", height: "35rem" }}>
        <Line data={soilMoistureData} ref={chartRef} options={chartOptions} />
      </div>
    </>
  );
}

export default SoilMoistureChart;
