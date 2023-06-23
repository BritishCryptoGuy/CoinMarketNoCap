import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function WatchlistPage(props) {
  const { localWatchlist, setLocalWatchlist, choice, setChoice } = props.prop;
  const [fetchData, setFetchData] = useState(false);
  const navigate = useNavigate();
  const watchlistStyle = {
    mainDiv: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      width: "100%",
      margin: "auto",
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

  useEffect(() => {
    const jointWatchlist = localWatchlist.join("%2C");
    function fetchWatchlist() {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${jointWatchlist}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
        {
          headers: {
            accept: "application/json",
          },
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFetchData(data);
        })
        .catch((error) => console.error(error));
    }
    fetchWatchlist();
  }, []);

  function sort24Hour(e) {
    e.preventDefault();
    console.log(e.target);
    e.target.toggleAttribute("descending");
    let filterBy = e.target.attributes[0].nodeValue;
    let sortBy24Hour;
    if (e.target.hasAttribute("descending")) {
      sortBy24Hour = [...fetchData].sort((a, b) => b[filterBy] - a[filterBy]);
    } else {
      sortBy24Hour = [...fetchData].sort((a, b) => a[filterBy] - b[filterBy]);
    }
    console.log(sortBy24Hour);
    setFetchData(sortBy24Hour);
  }

  function removeWatchlist(coin) {
    let coinName = coin.target.closest("[data-name]").dataset.name;
    let fetchIndex = fetchData.findIndex((e) => e.id === coinName);
    let coinIndex = localWatchlist.indexOf(coinName);
    let newFetchData = [...fetchData];
    let newLocalData = [...localWatchlist];
    newLocalData.splice(coinIndex, 1);
    newFetchData.splice(fetchIndex, 1);
    localStorage.setItem("watchlist", JSON.stringify(newLocalData));
    setLocalWatchlist(newLocalData);
    setFetchData(newFetchData);
  }

  return (
    <div style={watchlistStyle.mainDiv}>
      <h1 className="divTitle">Your Watchlist</h1>
      {!fetchData && (
        <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Loading!
          </h1>
        </div>
      )}
      {fetchData && (
        <div>
          <div className="chartHomeDiv cursor" style={watchlistStyle.coinDiv}>
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

          {fetchData &&
            fetchData.map((coin, index) => (
              <div
                data-name={coin.id}
                key={index}
                className="chartHomeDiv"
                style={watchlistStyle.coinDiv}
                onClick={(e) => {
                  if (e.target.localName === "path" || "svg") {
                    return;
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "10%",
                  }}
                >
                  <h2>{coin.market_cap_rank}</h2>

                  <img
                    style={watchlistStyle.image}
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
                <div>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={removeWatchlist}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
