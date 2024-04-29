import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../movies-api";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.query.value.trim();
    query && setSearchParams({ query: query });
    form.reset();
  };

  useEffect(() => {
    async function getSearchMovie(searchQuery) {
      try {
        setMovies([]);
        setError(false);
        setLoading(true);
        const data = await searchMovie(searchQuery);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getSearchMovie(queryParam);
  }, [queryParam]);

  const filteredValues = useMemo(() => {
    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(queryParam.toLowerCase())
    );
  }, [movies, queryParam]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
      <div>
        <MovieList movies={filteredValues}></MovieList>
      </div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MoviesPage;
