function MarketAndVolume(props) {
  const currency = props.prop.market_data;
  console.log(currency);
  return (
    <div id="marketCapDiv">
      <div className="marketCol">
        <h3>Market Cap</h3>
        <p>Rank: {currency.market_cap_rank}</p>
        <p>${currency.market_cap.usd.toLocaleString()}</p>
        <p>24 change: {currency.market_cap_change_percentage_24h}</p>
        <p>
          24h Volume / Market cap:{" "}
          {currency.total_volume.usd / currency.market_cap.usd}
        </p>
      </div>
      <div className="border"></div>
      <div className="marketCol">
        <h3>Fully Diluted Market Cap</h3>
        <p>
          ${currency.fully_diluted_valuation.usd.toLocaleString() || "Unknown"}
        </p>
      </div>
      <div className="border"></div>

      <div className="marketCol">
        <h3>Volume</h3>
        <p>24 Hour Volume: ${currency.total_volume.usd.toLocaleString()}</p>
      </div>
      <div className="border"></div>

      <div className="marketCol">
        <h3>Circulating Supply</h3>
        <p>{currency.circulating_supply}</p>
        <p>Max Supply: {currency.max_supply || "--"}</p>
        <p>Total Supply: {currency.total_supply || "--"}</p>
      </div>
    </div>
  );
}

export default MarketAndVolume;
