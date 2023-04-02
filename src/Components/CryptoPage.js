import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CryptoPage(props) {
  const location = useLocation();
  const selectedCrypto = location.state.selected;
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
      width: "10%",
      height: "auto",
    },
  };

  useEffect(() => {
    function fetchCurrency() {
      fetch(`https://api.coingecko.com/api/v3/search?query=${selectedCrypto}`, {
        headers: {
          accept: "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrency(data.coins[0]);
          console.log(data.coins[0]);
        })
        .catch((error) => console.error(error));
    }
    fetchCurrency();
  }, [setCurrency]);

  return (
    <>
      {!currency ? (
        <div style={cryptoPageStyle.fetchingDataStyle}>Fetching data!</div>
      ) : (
        <div style={cryptoPageStyle.mainDiv}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "40px" }}>{currency.name} </p>

            <img src={currency.large} style={cryptoPageStyle.logo} />
          </div>
        </div>
      )}
    </>
  );
}

export default CryptoPage;
