// src/services/movieService.ts
import axios from "axios";
import type { Movie } from "../types/movie";

// Тип відповіді від TMDB
interface TMDBResponse {
  results: Movie[];
}

// Функція для пошуку фільмів
export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const token = import.meta.env.VITE_TMDB_TOKEN; // Токен з .env
  const url = "https://api.themoviedb.org/3/search/movie";

  try {
    const response = await axios.get<TMDBResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}