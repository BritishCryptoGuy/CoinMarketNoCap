import { NavLink, Router } from "react-router-dom";

const headerStyle = {
  headerDiv: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0.5px 0.5px 0.5px 0.5px black",
    backgroundColor: "white",
  },
  h1Style: {
    fontFamily:
      "Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif",
    color: "black",
  },
  spanStyle: {
    color: "#8C1C13",
  },
};
function Header() {
  return (
    <>
      <div style={headerStyle.headerDiv}>
        <NavLink to="/">
          <h1 style={headerStyle.h1Style}>
            CoinMarket<span style={headerStyle.spanStyle}>No</span>Cap
          </h1>
        </NavLink>

        <nav>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </nav>
      </div>
    </>
  );
}

export default Header;
