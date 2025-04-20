import { Link, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContexts";
import { useTheme } from "../contexts/ThemeContext";
import "../css/Navbar.css";

function Navbar() {
    const { favorites } = useMovieContext();
    const { darkMode } = useTheme();
    const location = useLocation();

    return (
        <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">🎬</span>
                    Film Bank
                </Link>
                <div className="nav-links">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/favorites" 
                        className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
                    >
                        Favorites
                        {favorites.length > 0 && (
                            <span className="favorites-count">
                                {favorites.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;