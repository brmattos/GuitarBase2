import '../styles/navbar.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

function Navbar() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleAuthButton = async () => {
    if (userLoggedIn) {
      await doSignOut();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='header-box'>
      <nav className='navbar'>
        <ul className='link-container'>
          <li className='nav-link' onClick={() => navigate('/')}>
            Home
          </li>
          <li className='nav-link' onClick={() => navigate('/about')}>
            About
          </li>
          <li className='nav-link' onClick={() => navigate('/learn')}>
            Learn
          </li>
          <li className='nav-link explore'>
            <span className='nav-item-label'>
              <p>Explore</p>
              <ArrowDropDownIcon className='dropdown-icon' />
            </span>
            <ul className='drop-down'>
              <li onClick={() => navigate('/fretboard')}>Fretboard</li>
              <li onClick={() => navigate('/library')}>Library</li>
              <li onClick={() => navigate('/tools')}>Tools</li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='important-group'>
        <button className='sign-in' onClick={handleAuthButton}>
          {userLoggedIn ? 'LOG OUT' : 'LOGIN'}
        </button>
        <img src='images/favicon.png' className='logo-img' alt='logo' />
      </div>
    </div>
  );
}

export default Navbar;