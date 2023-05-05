import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Socials(prop) {
  const element = <FontAwesomeIcon icon={faEnvelope} />;

  return (
    <div>
      <div>{element} </div>
    </div>
  );
}

export default Socials;
