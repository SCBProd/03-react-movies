// src/services/movieService.ts
import axios from "axios";
import type { Movie } from "../types/movie";

// Тип відповіді від TMDB
type TMDBResponse = {
  results: Movie[];
};

// Функція для пошуку фільмів
export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const apiKey = import.meta.env.VITE_TMDB_TOKEN; // TMDB API ключ з .env
  const url = `https://api.themoviedb.org/3/search/movie`;

  try {
    const response = await axios.get<TMDBResponse>(url, {
      params: {
        query,
        api_key: apiKey,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}