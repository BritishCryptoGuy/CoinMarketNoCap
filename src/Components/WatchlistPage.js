import { useEffect, useState } from "react";

function WatchlistPage(props) {
  const { localWatchlist, setLocalWatchlist } = props.prop;
  const [fetchData, setFetchData] = useState(false);
  const watchlistStyle = {
    mainDiv: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      width: "100%",
      margin: " auto",
    },
  };
  // useEffect(() => {
  //   const retrieved = localStorage.getItem("watchlist");
  //   if (retrieved) {
  //     setLocalWatchlist(JSON.parse(retrieved));
  //   }
  // }, [setLocalWatchlist]);
  useEffect(() => {
    const fetchData = localWatchlist.join("%2C");
    function fetchWatchlist() {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${fetchData}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
        {
          headers: {
            accept: "application/json",
          },
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => setFetchData(data))
        .catch((error) => console.error(error));
    }
    fetchWatchlist();
  }, [localWatchlist]);
  return (
    <div style={watchlistStyle.mainDiv}>
      {fetchData &&
        fetchData.map((e) => <p key={e.id + "watchlist"}>{e.name}</p>)}
    </div>
  );
}

export default WatchlistPage;
