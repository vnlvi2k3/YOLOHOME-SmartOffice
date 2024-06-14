import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import addData from "./addData";
import removeData from "./removeData";
import GetLast from "../../../action/GetLast";
import GetFeed from "../../../action/GetFeed";

function MoistureChart() {
  const chartRef = useRef();
  const [moistureData, setMoistureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Moisture",
        data: [],
        borderWidth: 2,
        tension: 0.3,
        fill: 'start',
        backgroundColor: ["rgb(191,219,254,1)"],
        borderColor: "blue",
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
      setMoistureData({
        labels: result.map((data) => new Date(data.created_at).toLocaleTimeString()).reverse(),
        datasets: [
          {
            label: "Moisture",
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
    if (value <= 20) return "rgba(239,246,255,0.8)"; // very dry
    if (value > 20 && value <= 40) return "rgba(219,234,254,0.8)"; // dry
    if (value > 40 && value <= 60) return "rgba(191,219,254,0.8)"; // normal
    if (value > 60 && value <= 80) return "rgba(147,197,253,0.8)"; // moist
    return "rgba(96,165,250,0.8)"; // very moist
  };

  const getSegmentBorderColor = (value) => {
    if (value <= 20) return "rgb(239,246,255)"; // very dry
    if (value > 20 && value <= 40) return "rgb(219,234,254)"; // dry
    if (value > 40 && value <= 60) return "rgb(191,219,254)"; // normal
    if (value > 60 && value <= 80) return "rgb(147,197,253)"; // moist
    return "rgb(96,165,250)"; // very moist
  };

  return (
    <>
      <div className="flex lg:hidden md:hidden mt-5 m-2" style={{ width: "18rem", height: "20rem" }}>
        <Line data={moistureData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden lg:hidden md:flex" style={{ width: "35rem", height: "25rem" }}>
        <Line data={moistureData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden lg:flex md:hidden mt-5 m-2" style={{ width: "40rem", height: "35rem" }}>
        <Line data={moistureData} ref={chartRef} options={chartOptions} />
      </div>
    </>
  );
}

export default MoistureChart;
