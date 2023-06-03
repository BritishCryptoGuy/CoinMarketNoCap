import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

function Socials(prop) {
  const twitterLink = prop.prop.links?.twitter_screen_name
    ? "https://twitter.com/" + prop.prop.links.twitter_screen_name
    : false;
  const websiteLink = prop.prop.links?.homepage[0]
    ? prop.prop.links.homepage[0]
    : false;
  const githubLink = prop.prop.links?.repos_url.github[0]
    ? prop.prop.links.repos_url.github[0]
    : false;
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
  const browserLogo = (
    <FontAwesomeIcon icon={faLink} style={{ color: "#c40e0e" }} />
  );
  const githubLogo = (
    <FontAwesomeIcon icon={faGithub} style={{ color: "#000000" }} />
  );

  return (
    <div style={socialsStyle.socialsDiv}>
      <a style={socialsStyle.logo} href={twitterLink} target="_blank">
        {twitterLogo}
      </a>
      <a style={socialsStyle.logo} href={websiteLink} target="_blank">
        {browserLogo}
      </a>
      <a style={socialsStyle.logo} href={githubLink} target="_blank">
        {githubLogo}
      </a>
    </div>
  );
}

export default Socials;
