import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/loader";
import MovieGrid from "../MovieGrid/movieGrid";
import ErrorMessage from "../ErrorMessage/errorMessage";
import MovieModal from "../MovieModal/movieModal";
import axios from "axios";
import type { Movie } from "../../services/movie";



export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  async function handleSearch(query: string) {
    try {
      setIsLoading(true);
      setError(false);

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );

      if (data.results.length === 0) {
        setMovies([]);
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch (err) {
      setError(true);
      setMovies([]);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSearch={handleSearch} />

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}