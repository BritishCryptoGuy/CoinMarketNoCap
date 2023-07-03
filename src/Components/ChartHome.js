import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ChartHome(prop) {
  let { choice, setChoice, localWatchlist, setLocalWatchlist } = prop.prop;
  const [chart, setChart] = useState(false);
  const [failedFetch, setFailedFetch] = useState(false);
  const navigate = useNavigate();

  const chartHomeStyle = {
    mainDiv: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      width: "100%",
      margin: "auto",
    },
    cursor: {
      cursor: "pointer",
    },
  };
  function starColor(star) {
    if (!localWatchlist) {
      return;
    } else if (localWatchlist.includes(star)) {
      return "rgb(255, 0, 0)";
    } else {
      return "grey";
    }
  }
  useEffect(() => {
    function fetchChart() {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
        {
          headers: {
            accept: "application/json",
          },
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => setChart(data))
        .catch((error) => {
          console.error(error);
          console.log(error);
          setFailedFetch(true);
        });
    }
    !chart && fetchChart();
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
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(localWatchlist));
  }, [localWatchlist]);

  function watchlist(coin) {
    let coinName = coin.target.closest("[data-name]").dataset.name;
    if (!localWatchlist) {
      setLocalWatchlist([coinName]);
    } else if (localWatchlist.includes(coinName)) {
      let localWatchlistCopy = localWatchlist;
      let coinIndex = localWatchlist.indexOf(coinName);
      localWatchlistCopy.splice(coinIndex, 1);
      setLocalWatchlist([...localWatchlistCopy]);
    } else {
      setLocalWatchlist([...localWatchlist, coinName]);
    }
  }

  return (
    <>
      <div style={chartHomeStyle.mainDiv}>
        <div className="divTitle">
          <h1
            style={{
              padding: "20px",
            }}
          >
            Cryptocurrencies by Market cap
          </h1>
        </div>
        {!chart && failedFetch ? (
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#8c1c13",
            }}
          >
            CORS Error! API limit reached, please wait 2 minutes and refresh.
          </h1>
        ) : (
          !chart && (
            <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Loading!
              </h1>
            </div>
          )
        )}
        {chart && (
          <div style={{ padding: "0px 10px" }}>
            <div className="chartHomeDiv cursor">
              <h2 data-sort="market_cap_rank" onClick={sort24Hour}>
                #
              </h2>
              <p></p>
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
              <p
                data-sort="watchlist"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Watchlist
              </p>
            </div>
            {chart &&
              chart.map((coin, index) => (
                <div
                  data-name={coin.id}
                  key={index}
                  className="chartHomeDiv"
                  onClick={(e) => {
                    if (e.target.localName === "path") {
                      watchlist(e);
                    } else if (e.target.localName === "svg") {
                      watchlist(e);
                    } else {
                      let cryptoSelection =
                        e.target.closest("[data-name]").dataset.name;
                      let navName = "/currency/" + cryptoSelection;
                      setChoice(navName);
                      navigate(navName, {
                        state: { selected: cryptoSelection },
                      });
                    }
                  }}
                >
                  <h2>{coin.market_cap_rank}</h2>
                  <div>
                    <img
                      className="logoImage"
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

                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: starColor(coin.id), cursor: "pointer" }}
                    className={"icon"}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ChartHome;
