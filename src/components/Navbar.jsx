import '../styles/navbar.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="header-box">
      <nav className="navbar">
        <ul className="link-container">
          <li className="nav-link"><Link to="/">Home</Link></li>
          <li className="nav-link"><Link to="/about">About</Link></li>
          <li className="nav-link"><Link to="/learn">Learn</Link></li>
          <li className="nav-link explore">
            <span className="nav-item-label">
              <p>Explore</p>
              <ArrowDropDownIcon className="dropdown-icon" />
            </span>
            <ul className="drop-down">
              <li><Link to="/fretboard">Fretboard</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/tools">Tools</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="important-group">
        <button className="sign-in">SIGN IN</button>
        <img src="images/logo.png" className="logo-img" alt="logo" />
      </div>
    </div>
  )
}

export default Navbar;