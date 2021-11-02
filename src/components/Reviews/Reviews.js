import axios from "axios";
import { useState, useEffect } from "react";

export default function Reviews({ movieId }) {
  const api_key = "?api_key=47af3f3eb3cebf089eb55cbdac9542a5";
  const movie_url = `https://api.themoviedb.org/3/movie/${movieId}/reviews${api_key}&page=1`;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(movie_url).then((res) => setReviews(res.data.results));
  }, [movie_url]);

  return (
    <ul className="">
      {reviews.length
        ? reviews.map((r) => {
            return (
              <li key={r.id}>
                <b>Author: {r.author}</b>
                <p>{r.content}</p>
              </li>
            );
          })
        : "We don`t have any reviews for this movie"}
    </ul>
  );
}
