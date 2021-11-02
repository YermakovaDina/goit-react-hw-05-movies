import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className="nav_link"
        activeClassName="nav_activeLink"
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className="nav_link"
        activeClassName="nav_activeLink"
      >
        Movies
      </NavLink>

      <hr />
    </nav>
  );
}
