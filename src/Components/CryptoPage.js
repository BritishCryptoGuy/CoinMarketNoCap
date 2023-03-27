import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CryptoPage(props) {
  const location = useLocation();
  const selectedCrypto = location.state.selected;
  const [currency, setCurrency] = useState(false);

  useEffect(() => {
    function fetchCurrency() {
      fetch(`https://api.coingecko.com/api/v3/search?query=${selectedCrypto}`, {
        headers: {
          accept: "application/json",
        },
        method: "GET",
        // mode: "no-cors",
        // setChart(data.coins)
      })
        .then((response) => response.json())
        .then((data) => setCurrency(data.coins[0]))
        .catch((error) => console.error(error));
    }
    fetchCurrency();
  }, [setCurrency]);

  return (
    <div>
      <div>
        <p>{currency && currency.name} </p>
      </div>
    </div>
  );
}

export default CryptoPage;
