import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import TrendingHome from "./Components/TrendingHome";
import ChartHome from "./Components/ChartHome";
import CryptoPage from "./Components/CryptoPage";
import { useState } from "react";

function App() {
  let [choice, setChoice] = useState("/currency/");
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TrendingHome prop={{ choice, setChoice }} />
              <ChartHome prop={{ choice, setChoice }} />
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
