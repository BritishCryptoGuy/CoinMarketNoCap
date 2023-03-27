import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import TrendingHome from "./Components/TrendingHome";
import ChartHome from "./Components/ChartHome";
import CryptoPage from "./Components/CryptoPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TrendingHome />
              <ChartHome />
            </>
          }
        />
        <Route path="/currency" element={<CryptoPage />} />
        {/* <Route path="/watchlist" element={<Watchlist/>}/> */}
        {/* <Route path="/portfolio" element={<Portfolio/>}/> */}
      </Routes>
    </>
  );
}

export default App;
