import axios from "axios";
import { useState, useEffect } from "react";

export default function Cast({ movieId }) {
  const api_key = "?api_key=47af3f3eb3cebf089eb55cbdac9542a5";
  const movie_url = `https://api.themoviedb.org/3/movie/${movieId}/credits${api_key}`;

  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios.get(movie_url).then((res) => setCast(res.data.cast));
  }, [movie_url]);

  return (
    <ul className="">
      {cast.map((actor) => {
        return (
          <li key={actor.id}>
            <img
              className=""
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://static.wikia.nocookie.net/fastandfurious/images/8/8e/Dom.png"
              }
              alt=""
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}
