import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChartHome() {
  const [chart, setChart] = useState(false);
  const navigate = useNavigate();
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
    cursor: {
      cursor: "pointer",
    },
    image: {
      height: "60px",
      width: "auto",
    },
  };
  useEffect(() => {
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
  }, [setChart]);

  function sort24Hour(e) {
    e.preventDefault();
    e.target.toggleAttribute("descending");
    let filterBy = e.target.attributes[0].nodeValue;
    let sortBy24Hour;
    if (e.target.hasAttribute("descending")) {
      sortBy24Hour = [...chart].sort((a, b) => b[filterBy] - a[filterBy]);
    } else {
      sortBy24Hour = [...chart].sort((a, b) => a[filterBy] - b[filterBy]);
    }
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
          <div className="chartHomeDiv cursor" style={chartHomeStyle.coinDiv}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "18px",
                width: "10%",
              }}
            >
              <h2 data-sort="market_cap_rank" onClick={sort24Hour}>
                #
              </h2>
            </div>
            <p style={{ cursor: "default" }}>Coin Name</p>
            <p data-sort="current_price" onClick={sort24Hour}>
              Current Price
            </p>
            <p data-sort="price_change_percentage_24h" onClick={sort24Hour}>
              24H Action
            </p>
            <p data-sort="circulating_supply" onClick={sort24Hour}>
              Circulating Supply
            </p>
            <p data-sort="total_supply" onClick={sort24Hour}>
              Total Supply
            </p>
          </div>
          {chart &&
            chart.map((coin, index) => (
              <div
                data-name={coin.id}
                key={index}
                className="chartHomeDiv"
                style={chartHomeStyle.coinDiv}
                onClick={(e) => {
                  let cryptoSelection =
                    e.target.closest("[data-name]").dataset.name;
                  navigate("/currency", {
                    state: { selected: cryptoSelection },
                  });
                }}
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
                <p>{coin.circulating_supply?.toLocaleString()}</p>
                <p>{coin.total_supply?.toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ChartHome;
