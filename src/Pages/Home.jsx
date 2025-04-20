import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";    
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/API";
import { useTheme } from "../contexts/ThemeContext";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { darkMode, toggleTheme } = useTheme();
    const [searchParams] = useSearchParams();
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        // Check for navbar search results first
        const navbarQuery = searchParams.get('search');
        if (navbarQuery) {
            const results = JSON.parse(localStorage.getItem('searchResults') || '[]');
            setMovies(results);
            setSearchQuery(navbarQuery);
            setLoading(false);
        } else {
            loadPopularMovies();
        }
    }, [searchParams]);

    const loadPopularMovies = async () => {
        try {
            setLoading(true);
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            setError(null);
        } catch (error) {
            console.error("Error loading popular movies:", error);
            setError("Failed to load movies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            loadPopularMovies();
            return;
        }
        performSearch(searchQuery);
    };

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        // Clear any existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set a new timeout for real-time search
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                performSearch(query);
            } else {
                loadPopularMovies();
            }
        }, 500);

        setSearchTimeout(timeoutId);
    };

    const performSearch = async (query) => {
        try {
            setLoading(true);
            const searchResults = await searchMovies(query);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.error("Error searching movies:", error);
            setError("Failed to search movies. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
            <div className="background-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? '🌞' : '🌙'}
            </div>

            <div className="content-wrapper">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={handleSearchInput}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        <span>🔍</span>
                        Search
                    </button>
                </form>

                {loading && (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        Discovering movies...
                    </div>
                )}

                {error && <div className="error">{error}</div>}

                <div className="movies-grid">
                    {!loading && movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : !loading && (
                        <div className="no-results">
                            No movies found. Try a different search!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


// || movie.title.toLowerCase().includes(searchQuery.toLowerCase())