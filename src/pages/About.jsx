import '../styles/about.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function About() {

  return (
    <div className="main-container">
      <div className="contact">
        <h1 className="title">Contact Me!</h1>
        <p className="subtitle">Get in Touch</p>
        <div className="container-outside">
          <div className="contact-container">
            <FontAwesomeIcon icon={faLinkedin} size="3x" className="icon" />
            <p><a className="link" href="https://www.linkedin.com/in/brooke-mattos/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          </div>
          <div className="contact-container">
            <FontAwesomeIcon icon={faEnvelope} size="3x" className="icon" />
            <p><a className="link" href="mailto:brmattosbus@gmail.com">brmattosbus@gmail.com</a></p>
          </div>
          <div className="contact-container">
              <FontAwesomeIcon icon={faGithub} size="3x" className="icon" />
            <p><a className="link" href="https://github.com/brmattos" target="_blank" rel="noopener noreferrer">Github</a></p>
          </div>
        </div>
      </div>
      <img src="../images/profile.png" className="profile-img" alt="profile" loading="lazy" />
    </div>
  );
}

export default About;