import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
const Navigation = () => {
  return (
    <header>
      <nav className={css.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return clsx(css.link, isActive && css.active);
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => {
            return clsx(css.link, isActive && css.active);
          }}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
