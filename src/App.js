import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import TrendingHome from "./Components/TrendingHome";
import ChartHome from "./Components/ChartHome";
import CryptoPage from "./Components/CryptoPage";
import WatchlistPage from "./Components/WatchlistPage";
import { useState } from "react";

function App() {
  const [choice, setChoice] = useState("/currency/");
  const [localWatchlist, setLocalWatchlist] = useState(
    (localStorage.getItem("watchlist") &&
      JSON.parse(localStorage.getItem("watchlist"))) ||
      false
  );

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TrendingHome prop={{ choice, setChoice }} />
              <ChartHome
                prop={{ choice, setChoice, localWatchlist, setLocalWatchlist }}
              />
            </>
          }
        />
        <Route path={choice} element={<CryptoPage />} />
        <Route
          path="/watchlist"
          element={
            <WatchlistPage
              prop={{ localWatchlist, setLocalWatchlist, choice, setChoice }}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
