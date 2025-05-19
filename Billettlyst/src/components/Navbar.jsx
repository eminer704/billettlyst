import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">Billettlyst</Link>
            <ul className="navbar-menu">
                <li><Link to="/category/musikk">Musikk</Link></li>
                <li><Link to="/category/sport">Sport</Link></li>
                <li><Link to="/category/teater">Teater/Show</Link></li>
            </ul>
            <div className="navbar-login">
                <Link to="/dashboard">Logg inn</Link>
            </div>
        </nav>
    );
}

export default Navbar;
