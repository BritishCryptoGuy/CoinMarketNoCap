import { useEffect, useState } from "react";

function ChartHome() {
  const [chart, setChart] = useState(false);
  const chartHomeStyle = {
    mainDiv: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      width: "99%",
      margin: "auto",
      borderRadius: "8px",
    },
    coinDiv: {
      width: "100%",
      padding: "10px",
      height: "5%",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px dotted grey",
    },
    image: {
      height: "60px",
      width: "auto",
    },
  };
  function fetchChart() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
      {
        headers: {
          accept: "application/json",
        },
        method: "GET",
        // mode: "no-cors",
        // setChart(data.coins)
      }
    )
      .then((response) => response.json())
      .then((data) => setChart(data))
      .catch((error) => console.error(error));
  }
  fetchChart();

  function sort24Hour(e) {
    e.preventDefault();
    const sortBy24Hour = [...chart].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setChart(sortBy24Hour);
  }

  return (
    <>
      <div style={chartHomeStyle.mainDiv}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          Cryptocurrencies by Market cap
        </h1>
        <div>
          <div className="chartHomeDiv" style={chartHomeStyle.coinDiv}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "18px",
                width: "10%",
              }}
            >
              <h2>#</h2>
            </div>
            <p>Coin Name</p>
            <p>Current Price</p>
            <p onClick={sort24Hour}>24H Action</p>
            <p>Circulating Supply</p>
            <p>Total Supply</p>
          </div>
          {chart &&
            chart.map((coin, index) => (
              <div
                key={index}
                className="chartHomeDiv"
                style={chartHomeStyle.coinDiv}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "10%",
                  }}
                >
                  <h2>{coin.market_cap_rank}</h2>
                  <img
                    style={chartHomeStyle.image}
                    src={coin.image}
                    alt="Coin logo"
                  />
                </div>
                <p>{coin.name}</p>
                <p>${coin.current_price}</p>
                <p
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "green priceChange"
                      : "red priceChange"
                  }
                >
                  {coin.price_change_percentage_24h}%
                </p>
                <p>{coin.circulating_supply}</p>
                <p>{coin.total_supply}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ChartHome;
