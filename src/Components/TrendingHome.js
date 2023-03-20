import { useState } from "react";

function TrendingHome() {
  const [trending, setTrending] = useState(false);
  const trendingStyle = {
    trendingDiv: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
  };
  function fetchTrending() {
    fetch("https://api.coingecko.com/api/v3/search/trending", {
      headers: {
        accept: "application/json",
      },
      method: "GET",
      // mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => setTrending(data.coins))
      .catch((error) => console.error(error));
  }
  fetchTrending();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          backgroundColor: "white",
          margin: "20px auto",
          width: "50%",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1>Top trending cryptocurrencies </h1>
      </div>
      <div style={trendingStyle.trendingDiv}>
        {trending &&
          trending.map((coin, index) => (
            <div className="card" key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1 style={{ color: "red", margin: "0 0 10px 0" }}>
                  #{index + 1}
                </h1>
                <img src={coin.item.small} alt="Coin logo" />
              </div>
              <h3>{coin.item.name}</h3>
              <p>Ticker: {coin.item.symbol}</p>
              <p>Market Cap rank: {coin.item.market_cap_rank}</p>
            </div>
          ))}
      </div>
    </>
  );
}
// curl -X 'GET' \ 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d' \ -H 'accept: application/json'

export default TrendingHome;
