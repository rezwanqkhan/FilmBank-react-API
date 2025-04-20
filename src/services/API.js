import { API_KEY, BASE_URL } from '../config/apiConfig';


export const getPopularMovies = async () => {
       // Get popular movies
    // if you dont wanna use the api key from other file you can write it here 
    // const API_KEY = 'your api key';
    // const BASE_URL = 'https://api.themoviedb.org/3'; 


   const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
   const data = await response.json();
   return data.results;
}
 
 
export const searchMovies = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
            throw new Error('Search request failed');
        }
        const data = await response.json();
        console.log('Search results:', data); // Debug log
        return data.results || [];
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}
 
 
export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}


