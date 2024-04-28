import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function getReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <div className={css.container}>
          <h2>REVIEWS</h2>
          <ul className={css.list}>
            {reviews.map((review) => {
              return (
                <li key={review.id}>
                  <p className={css.autor}>Author: {review.author}</p>
                  <p className={css.text}>{review.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p> Don`t have reviews for this movie!</p>
      )}

      {error && <ErrorMessage />}
      {loading && <Loader />}
    </>
  );
};

export default MovieReviews;
