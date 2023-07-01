import { NavLink, Router, useNavigate } from "react-router-dom";

const headerStyle = {
  headerDiv: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
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
        <h1 className="headerTitle" onClick={() => navigate("/")}>
          CoinMarket<span style={headerStyle.spanStyle}>No</span>Cap
        </h1>

        <nav>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </nav>
      </div>
    </>
  );
}

export default Header;
