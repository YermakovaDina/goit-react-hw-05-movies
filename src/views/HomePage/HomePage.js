import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const BASE_URL = "https://api.themoviedb.org/3/trending/movie/day";
  const API_KEY = "?api_key=47af3f3eb3cebf089eb55cbdac9542a5";
  const url = BASE_URL + API_KEY;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((r) => setMovies(r.data.results))
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <>
      <h1 className="">Trending today</h1>
      <ul className="">
        {movies.map((movie) => {
          if (movie.title) {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: "/",
                      label: "Back to Home",
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          }
          if (movie.name) {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: "/",
                      label: "Back to Home",
                    },
                  }}
                >
                  {movie.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
