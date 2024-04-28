import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getMovieCredits } from "../../movies-api";
import css from "./MovieCast.module.css";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!movieId) return;
    async function getCast() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);
  const defImg =
    "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";
  return (
    <>
      {cast.length > 0 ? (
        <div className={css.container}>
          <h2 className={css.title}>CAST</h2>
          <ul className={css.list}>
            {cast.map((item) => {
              return (
                <li key={item.id} className={css.item}>
                  <img
                    src={
                      item.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                        : defImg
                    }
                    alt={item.original_name}
                  />
                  <p className={css.text}>{item.original_name}</p>
                  {item.character && <p>Character: {item.character}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Don`t have cast for this movie!</p>
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </>
  );
};

export default MovieCast;
