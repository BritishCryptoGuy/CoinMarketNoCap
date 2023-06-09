import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import TrendingHome from "./Components/TrendingHome";
import ChartHome from "./Components/ChartHome";
import CryptoPage from "./Components/CryptoPage";
import { useState } from "react";

function App() {
  const [choice, setChoice] = useState("/currency/");
  const [localWatchlist, setLocalWatchlist] = useState(false);

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
        {/* <Route path="/watchlist" element={<Watchlist/>}/> */}
        {/* <Route path="/portfolio" element={<Portfolio/>}/> */}
      </Routes>
    </>
  );
}

export default App;
