import MovieCast from "../MovieCast/MovieCast.jsx";
import MovieReviews from "../MovieReviews/MovieReviews.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import MoviesPage from "../../pages/MoviesPage/MoviesPage.jsx";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import css from "./App.module.css";
const App = () => {
  return (
    <div className={css.container}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
