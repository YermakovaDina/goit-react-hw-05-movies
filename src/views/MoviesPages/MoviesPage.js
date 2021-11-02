import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const location = useLocation();

  const BASE_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "?api_key=47af3f3eb3cebf089eb55cbdac9542a5";
  const query = `&query=${searchQuery}`;
  const search_url = BASE_URL + API_KEY + query;

  useEffect(() => {
    const query_url = new URLSearchParams(location.search).get("query");

    if (!searchQuery && !query_url) {
      return;
    }

    if (!inputValue && query_url) {
      const prevQuery = `&query=${query_url}`;
      const search_url = BASE_URL + API_KEY + prevQuery;
      axios
        .get(search_url)
        .then((res) => setMovies(res.data.results))
        .then(
          history.push({
            ...location,
            search: `query=${query_url}`,
          })
        )
        .catch((err) => console.log(err));
    } else
      axios
        .get(search_url)
        .then((res) => setMovies(res.data.results))
        .then(
          history.push({
            ...location,
            search: `query=${searchQuery}`,
          })
        )
        .catch((err) => console.warn(err));
  }, [searchQuery]);
  // useEffect(() => {
  //   axios.get(search_url).then((r) => setMovies(r.data));
  // }, [searchQuery]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("location", location);
    console.log("history", history);

    setSearchQuery(inputValue);
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <form className="" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="searh"
          value={inputValue}
          className=""
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className="">
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,

                    state: {
                      from:
                        `${history.location.pathname}` +
                        `${history.location.search}`,
                      label: "Back to movies from moviePage",
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
