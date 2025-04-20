import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContexts";
import { useState } from "react";

function MovieCard({ movie }) {
    const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    const [showTrailer, setShowTrailer] = useState(false);

    const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    function onFavoriteClick() {
        if (isFavorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    const handleWatchTrailer = () => {
        setShowTrailer(true);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: movie.title,
                text: `Check out ${movie.title} on Film Bank!`,
                url: window.location.href,
            });
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img 
                    src={imageUrl} 
                    alt={movie.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                    }}
                />
                <div className="movie-overlay">
                    <div className="rating-badge">
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </div>
                    <button 
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
                        onClick={onFavoriteClick}
                    />
                    <div className="quick-actions">
                        <button 
                            className="quick-action-btn"
                            onClick={handleWatchTrailer}
                        >
                            Watch Trailer
                        </button>
                        <button 
                            className="quick-action-btn"
                            onClick={handleShare}
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>📅 {movie.release_date?.split('-')[0]}</p>
                <p>⭐ {movie.vote_average?.toFixed(1)} / 10</p>
            </div>
            {showTrailer && (
                <div className="trailer-modal">
                    <div className="trailer-content">
                        <button 
                            className="close-btn"
                            onClick={() => setShowTrailer(false)}
                        >
                            ×
                        </button>
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${movie.video_key}`}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieCard;
