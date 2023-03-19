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
  },
  spanStyle: {
    color: "red",
  },
};
function Header() {
  return (
    <>
      <div style={headerStyle.headerDiv}>
        <h1 style={headerStyle.h1Style}>
          CoinMarket<span style={headerStyle.spanStyle}>No</span>Cap
        </h1>
        <nav>
          <NavLink path="/portfolio">Portfolio</NavLink>
          <NavLink path="/watchlist">Watchlist</NavLink>
        </nav>
      </div>
    </>
  );
}

export default Header;
