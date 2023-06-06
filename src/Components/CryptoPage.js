import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MarketAndVolume from "../Components/MarketAndVolume";
import Description from "./Description";
import Socials from "./Socials";
import PriceChart from "./PriceChart";
import noImgFound from "../images/No-image-found.jpg";

function CryptoPage(props) {
  const location = useLocation();
  const selectedCrypto = location.state.selected || false;
  const [currency, setCurrency] = useState(false);
  const cryptoPageStyle = {
    mainDiv: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      width: "100%",
      margin: " auto",
    },
    fetchingDataStyle: {
      display: "flex",
      justifyContent: "center",
      width: "80%",
      height: "90%",
      margin: "5px auto",
      backgroundColor: "white",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "50px",
    },
    logo: {
      width: "auto",
      height: "5em",
      padding: "0px 10px",
    },
  };
  useEffect(() => {
    function fetchCurrency() {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto.toLowerCase()}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`,
        {
          headers: {
            accept: "application/json",
          },
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrency(data);
        })
        .catch((error) => console.error(error));
    }
    fetchCurrency();
  }, [setCurrency, selectedCrypto]);
  return (
    <>
      {!currency ? (
        <div style={cryptoPageStyle.fetchingDataStyle}>Fetching data!</div>
      ) : (
        <div style={cryptoPageStyle.mainDiv}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "40px" }}>{currency.name} </p>

              <img
                src={currency.image?.large || noImgFound}
                style={cryptoPageStyle.logo}
                alt={currency.name + " logo"}
              />
            </div>
            <div
              style={{
                width: "70%",
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                fontSize: "15px",
              }}
            >
              <p style={{ fontSize: "25px", paddingBottom: "10px" }}>
                ${currency.market_data?.current_price.usd || "N/A"}
                <span
                  className={
                    currency.market_data?.price_change_percentage_24h > 0
                      ? "green"
                      : "red" || ""
                  }
                  style={{ paddingLeft: "20px" }}
                >
                  {currency.market_data?.price_change_percentage_24h || "N/A"}
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "40%",
                  color: "grey",
                }}
              >
                <p>Low 24H: ${currency.market_data?.low_24h.usd || "N/A"}</p>
                <p>High 24H: ${currency.market_data?.high_24h.usd || "N/A"}</p>
              </div>
            </div>
          </div>
          <MarketAndVolume prop={currency} />
          <div id="chartAndDescription">
            {/* <div style={{ width: "70%" }}></div> */}
            <PriceChart prop={currency} />
            <Description prop={currency} />
          </div>
          <Socials prop={currency} />
        </div>
      )}
    </>
  );
}

export default CryptoPage;
