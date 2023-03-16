import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/watchlist" element={<Watchlist/>}/> */}
        {/* <Route path="/portfolio" element={<Portfolio/>}/> */}
      </Routes>
    </>
  );
}

export default App;
