import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import addData from "./addData";
import removeData from "./removeData";
import GetLast from "../../../action/GetLast";
import GetFeed from "../../../action/GetFeed";

function TemperatureChart() {
  const chartRef = useRef();
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        borderWidth: 2,
        backgroundColor: ["rgb(252,165,165,1)"],
        borderColor: "pink",
        pointBackgroundColor: "pink",
        tension: 0.3,
        fill: 'start',
        segment: {
          backgroundColor: ctx => getSegmentBackgroundColor(ctx.p0.parsed.y),
          borderColor: ctx => getSegmentBorderColor(ctx.p0.parsed.y),
        },
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetFeed("temperature");
      setTemperatureData({
        labels: result.map((data) => new Date(data.created_at).toLocaleTimeString()).reverse(),
        datasets: [
          {
            label: "Temperature",
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
    console.log("request from chart")

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      GetLast("temperature").then((result) => {
        addData(
          chartRef.current,
          new Date(result.created_at).toLocaleTimeString(),
          result.value
        );
        console.log("AFTER FETCH", result.value);
        removeData(chartRef.current);
      });
    }, 5000);
    console.log("request from chart")
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: -20,
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
    if (value <= 0) return "rgba(147,197,253,0.8)"; // cold
    if (value > 0 && value <= 15) return "rgba(219,234,254,0.8)"; // cool
    if (value > 15 && value <= 30) return "rgba(254,202,202,0.8)"; // warm
    if (value > 30 && value <= 40) return "rgba(248,113,113,0.8)"; // hot
    return "rgba(220,38,38,0.8)"; // very hot
  };

  const getSegmentBorderColor = (value) => {
    if (value <= 0) return "rgb(147,197,253)"; // cold
    if (value > 0 && value <= 15) return "rgb(219,234,254)"; // cool
    if (value > 15 && value <= 30) return "rgb(254,202,202)"; // warm
    if (value > 30 && value <= 40) return "rgb(248,113,113)"; // hot
    return "rgb(220,38,38)"; // very hot
  };

  return (
    <>
      <div className="flex lg:hidden md:hidden mt-5 m-2" style={{ width: "18rem", height: "20rem" }}>
        <Line data={temperatureData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden lg:hidden md:flex" style={{ width: "35rem", height: "25rem" }}>
        <Line data={temperatureData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden lg:flex md:hidden mt-5 m-2" style={{ width: "40rem", height: "35rem" }}>
        <Line data={temperatureData} ref={chartRef} options={chartOptions} />
      </div>
    </>
  );
}

export default TemperatureChart;
