import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Select } from "antd";
import { graphOptions, weekdays } from "../../../constant/structuralContants";

const RevenueGraph = () => {
  const [userRegisterFilter, setUserRegisterFilter] = useState("daily");

  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: weekdays,
          datasets: [
            {
              label: "Omi",
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: "#00CBDF",
              borderColor: "#00CBDF",
              barThickness: 30,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
              title: {
                display: false,
                text: "Day of Week",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: false,
                text: "Sales",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };
  }, []);

  return (
    <>
      <div className="revenueHead">
        <h4>Revenue Generated: 0</h4>
        <Select
          className="customSelect"
          value={userRegisterFilter}
          onChange={(e) => {
            setUserRegisterFilter(e);
          }}
          menuisopen={"true"}
          options={graphOptions}
        />
      </div>
      <canvas ref={chartRef} />
    </>
  );
};

export default RevenueGraph;
