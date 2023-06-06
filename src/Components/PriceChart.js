import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const priceChartStyle = {
  button: {
    border: "2px solid #8c1c13",
    padding: "2px 6px",
    borderRadius: "8px",
  },
};

function PriceChart(prop) {
  let cryptoName = prop.prop.id;
  let [cryptoObj, setCryptoObj] = useState(false);

  function fetchChart(days) {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=${
        days || "7"
      }`,
      {
        headers: {
          accept: "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setCryptoObj(data.prices));
  }

  useEffect(() => {
    fetchChart();
  }, [setCryptoObj]);

  function changeDataRange(req) {
    console.log(req);
    if (req === "Max") {
      fetchChart("max");
    } else if (req === "24h") {
      fetchChart("1");
    } else if (req === "1y") {
      fetchChart("365");
    } else {
      fetchChart(req.slice(0, -1));
    }
  }

  let chartData = !cryptoObj
    ? false
    : cryptoObj.map((val) => ({ x: val[0], y: val[1].toFixed(2) }));

  const options = {
    responsive: true,
  };
  const data = {
    labels:
      chartData &&
      chartData.map((val) => moment(val.x).format("MMMM Do, h:mm a")),
    datasets: [
      {
        fill: true,
        label: cryptoName,
        data: chartData && chartData.map((val) => val.y),
        borderColor:
          chartData && chartData[0].y <= chartData.slice(-1)[0].y
            ? "rgb(0, 128, 0)"
            : "rgb(255, 0, 0)",
      },
    ],
  };

  return (
    <div style={{ width: "70%" }}>
      <Line options={options} data={data} />
      <div
        style={{ display: "flex", justifyContent: "space-evenly" }}
        onClick={(e) => changeDataRange(e.target.innerHTML)}
      >
        <p style={priceChartStyle.button}>24h</p>
        <p style={priceChartStyle.button}>7d</p>
        <p style={priceChartStyle.button}>14d</p>
        <p style={priceChartStyle.button}>30d</p>
        <p style={priceChartStyle.button}>90d</p>
        <p style={priceChartStyle.button}>180d</p>
        <p style={priceChartStyle.button}>1y</p>
        <p style={priceChartStyle.button}>Max</p>
      </div>
    </div>
  );
}

export default PriceChart;
