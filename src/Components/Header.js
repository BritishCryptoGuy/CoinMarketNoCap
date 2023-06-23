import { NavLink, Router, useNavigate } from "react-router-dom";

const headerStyle = {
  headerDiv: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  h1Style: {
    fontFamily:
      "Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif",
    color: "black",
    cursor: "pointer",
  },
  spanStyle: {
    color: "#8C1C13",
  },
};
function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div style={headerStyle.headerDiv}>
        <h1 style={headerStyle.h1Style} onClick={() => navigate("/")}>
          CoinMarket<span style={headerStyle.spanStyle}>No</span>Cap
        </h1>

        <nav>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </nav>
      </div>
    </>
  );
}

export default Header;
