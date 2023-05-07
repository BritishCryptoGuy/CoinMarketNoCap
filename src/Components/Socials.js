import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Socials(prop) {
  const socialsStyle = {
    socialsDiv: {
      display: "flex",
      justifyContent: "center",
    },
    logo: {
      fontSize: "40px",
      padding: "20px",
    },
  };
  const twitterLogo = (
    <FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2" }} />
  );
  const facebookLogo = (
    <FontAwesomeIcon icon={faFacebook} style={{ color: "#3b5998" }} />
  );
  const githubLogo = (
    <FontAwesomeIcon icon={faGithub} style={{ color: "#000000" }} />
  );

  return (
    <div style={socialsStyle.socialsDiv}>
      <div style={socialsStyle.logo}>{twitterLogo} </div>
      <div style={socialsStyle.logo}>{facebookLogo}</div>
      <div style={socialsStyle.logo}>{githubLogo}</div>
    </div>
  );
}

export default Socials;
