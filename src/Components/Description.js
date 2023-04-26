function Description(props) {
  let currency = props.prop;
  let description = currency.description?.en || "No description available";

  return (
    <div id="descriptionDiv">
      <h4 style={{ padding: "20px", textAlign: "center" }}>
        What is {currency.name}?
      </h4>
      <div>{description}</div>
    </div>
  );
}

export default Description;
