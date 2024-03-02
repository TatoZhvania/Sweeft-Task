import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="header-div">
      <nav>
        <ul className="nav-div">
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
