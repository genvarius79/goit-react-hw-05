import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../../movies-api";
import css from "./MoviesPage.module.css";
const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getSearchMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await searchMovie(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getSearchMovie();
  }, [query]);

  const filteredValues = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={css.container}>
      <form onSubmit={(event) => setQuery(event.target.value)}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <ul>
          {filteredValues.map((value) => {
            return (
              <li key={value.id}>
                <Link to={`/movies/${value.id}`}>{value.original_title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MoviesPage;
