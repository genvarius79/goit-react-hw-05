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
      <div className={css.imageContainer}>
        {movies.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`}
            alt=""
          />
        )}
        <div className={css.descriptionContainer}>
          <h2 className={css.title}>{movies.original_title}</h2>
          {movies.vote_average && <p>User score: {movies.vote_average}</p>}
          {movies.overview && (
            <div>
              <h4 className={css.subTitle}>Overview</h4>
              <p className={css.text}>{movies.overview}</p>
            </div>
          )}
          {movies.genres && (
            <div>
              <h4 className={css.subTitle}>Genres</h4>
              <ul>
                {movies.genres.map((genre) => (
                  <li key={genre.id}>
                    <p className={css.text}>{genre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {movies.production_countries && (
            <div>
              <h4 className={css.subTitle}>Country</h4>

              <ul>
                {movies.production_countries.map((country) => (
                  <li key={movies.production_countries.indexOf("country.name")}>
                    <p className={css.text}>{country.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={css.additionalContainer}>
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
