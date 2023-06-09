import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TrendingHome(prop) {
  let { choice, setChoice } = prop.prop;
  const [trending, setTrending] = useState(false);
  const navigate = useNavigate();
  const trendingStyle = {
    trendingDiv: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
  };
  useEffect(() => {
    function fetchTrending() {
      fetch("https://api.coingecko.com/api/v3/search/trending", {
        headers: {
          accept: "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => setTrending(data.coins))
        .catch((error) => console.error(error));
    }
    fetchTrending();
  }, [setTrending]);

  return (
    <>
      <div className="divTitle">
        <h1>Top trending cryptocurrencies </h1>
      </div>
      <div style={trendingStyle.trendingDiv}>
        {trending &&
          trending.map((coin, index) => (
            <div
              className="card"
              key={index}
              data-name={coin.item.id}
              onClick={(e) => {
                let cryptoSelection =
                  e.target.closest("[data-name]").dataset.name;
                let navName = "/currency/" + cryptoSelection;
                setChoice(navName);
                navigate(navName, {
                  state: { selected: cryptoSelection },
                });
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1 className="trendingH1">#{index + 1}</h1>
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

export default TrendingHome;
