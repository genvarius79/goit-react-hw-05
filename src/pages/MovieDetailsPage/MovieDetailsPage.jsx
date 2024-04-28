import { useEffect, useRef, useState, Suspense } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../movies-api";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

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

  const defImg =
    "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";

  return (
    <div className={css.container}>
      <NavLink to={backLink.current} className={css.backLink}>
        Go back
      </NavLink>

      <div className={css.imageContainer}>
        {movies.backdrop_path && (
          <img
            src={
              movies.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`
                : defImg
            }
            alt={movies.original_title}
            width={500}
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
                {movies.production_countries.map((country, idx) => (
                  <li key={idx}>
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
        <div className={css.link}>
          <NavLink
            to="cast"
            className={({ isActive }) => {
              return clsx(css.link, isActive && css.active);
            }}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) => {
              return clsx(css.link, isActive && css.active);
            }}
          >
            Reviews
          </NavLink>
        </div>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet></Outlet>
      </Suspense>

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MovieDetailsPage;
