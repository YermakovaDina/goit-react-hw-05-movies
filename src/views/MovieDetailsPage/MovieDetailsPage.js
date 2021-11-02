import {
  useParams,
  NavLink,
  useRouteMatch,
  Route,
  Switch,
} from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";
import "./MovieDetailsPage.css";

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const BASE_URL_movie = `https://api.themoviedb.org/3/movie/`;
  const API_KEY = "?api_key=47af3f3eb3cebf089eb55cbdac9542a5";
  const movie_url = BASE_URL_movie + movieId + API_KEY;

  useEffect(() => {
    axios
      .get(movie_url)
      .then((r) => setMovie(r.data))
      .catch((err) => console.log(err));
  }, [movie_url]);

  const handleClick = () =>
    //history.push("/");
    history.push(location?.state?.form?.location ?? "/");

  return (
    <>
      <button type="button" className="btn" onClick={handleClick}>
        <NavLink to="/" exact className="button_back">
          Go back
        </NavLink>
      </button>
      {movie && (
        <>
          <div className="card">
            <div className="img">
              <img
                className=""
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div>
              <h2>
                {movie.title} ({movie.release_date})
              </h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className="">
                {movie.genres.map((genre) => {
                  return (
                    <li className="" key={genre.id}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr />
          <div className="info">
            <h2>Additional information</h2>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      from: `${history.location.state}`
                        ? `${history.location.state.from}`
                        : "/movies",
                      label: "Back to movies from Cast",
                    },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      from: `${history.location.state.from}`,
                      label: "Back to movies from Reviews",
                    },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <Switch>
            <Route path="/movies/:movieId/cast">
              <Cast movieId={movieId} />
            </Route>
            <Route path="/movies/:movieId/reviews">
              <Reviews movieId={movieId} />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
