import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovieDetails } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getMovieById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);

  return (
    <div className={css.container}>
      <div>
        {movies.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`}
            alt=""
          />
        )}
        <div>
          <h2>{movies.original_title}</h2>
          {movies.vote_average && <p>User score: {movies.vote_average}</p>}
          {movies.overview && (
            <div>
              <h4>Overview</h4>
              <p>{movies.overview}</p>
            </div>
          )}
          {movies.genres && (
            <div>
              <h4>Genres</h4>
              <ul>
                {movies.genres.map((genre) => (
                  <li key={genre.id}>
                    <p>{genre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {movies.production_countries && (
            <div>
              <h4>Country</h4>

              <ul>
                {movies.production_countries.map((country) => (
                  <li key={movies.production_countries.indexOf("country.name")}>
                    <p>{country.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MovieDetailsPage;
