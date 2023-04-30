import parse from "html-react-parser";

function Description(props) {
  let currency = props.prop;
  let description = currency.description?.en || "No description available";

  function descriptionFilter(des) {
    const apiResponse = des;
    const filteredDescription = parse(apiResponse, {
      replace: ({ attribs, children }) => {
        if (attribs && attribs.href) {
          return (
            <a href={attribs.href} target="_blank">
              {children[0].data}
            </a>
          );
        }
      },
    });

    return filteredDescription;
  }

  return (
    <div id="descriptionDiv">
      <h4 style={{ padding: "20px", textAlign: "center" }}>
        What is {currency.name}?
      </h4>
      <div id="descriptionData">
        {description && descriptionFilter(description)}
      </div>
    </div>
  );
}

export default Description;
