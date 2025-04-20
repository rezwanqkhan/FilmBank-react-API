import { useMovieContext } from "../contexts/MovieContexts";
import { useTheme } from "../contexts/ThemeContext";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Favorites() {
    const { favorites } = useMovieContext();
    const { darkMode } = useTheme();

    return (
        <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
            <div className="background-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="content-wrapper">
                <h1 className="page-title">My Favorites</h1>
                
                <div className="movies-grid">
                    {favorites.length > 0 ? (
                        favorites.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <div className="no-results">
                            No favorite movies yet. Start adding some!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Favorites;