function MarketAndVolume(props) {
  const currency = props.prop.market_data;
  return (
    <div id="marketCapDiv">
      <div className="marketCol">
        <h3 className="grey" style={{ paddingBottom: "10px" }}>
          Market Cap
        </h3>
        <div>
          <p className="grey">
            Rank:{" "}
            <span style={{ color: "black" }}>
              {currency?.market_cap_rank || "N/A"}
            </span>
          </p>
          <p>${currency?.market_cap.usd?.toLocaleString() || "N/A"}</p>
          <p>
            24 change: {currency?.market_cap_change_percentage_24h || "N/A"}
          </p>
          <p>
            24h Volume / Market cap:{" "}
            {currency?.total_volume.usd / currency?.market_cap.usd || "N/A"}
          </p>
        </div>
      </div>
      <div className="marketCol">
        <h3 className="grey" style={{ paddingBottom: "10px" }}>
          Fully Diluted Market Cap
        </h3>
        <div>
          <p>
            $
            {currency?.fully_diluted_valuation.usd?.toLocaleString() ||
              "Unknown"}
          </p>
        </div>
      </div>

      <div className="marketCol">
        <h3 className="grey" style={{ paddingBottom: "10px" }}>
          Volume
        </h3>
        <div>
          <p>
            24 Hour Volume: $
            {currency?.total_volume.usd?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>

      <div className="marketCol">
        <h3 className="grey" style={{ paddingBottom: "10px" }}>
          Circulating Supply
        </h3>
        <div>
          <p>{currency?.circulating_supply?.toLocaleString() || "N/A"}</p>
          <p>Max Supply: {currency?.max_supply?.toLocaleString() || "--"}</p>
          <p>
            Total Supply: {currency?.total_supply?.toLocaleString() || "--"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketAndVolume;
