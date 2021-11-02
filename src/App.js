import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Container from "./components/Container";
import Navigation from "./components/Navigation/Navigation";
//Static Imports
import Loader from "./components/Loader/Loader";
// import HomePage from "./components/HomePage/HomePage";
// import MoviesPage from "./components/MoviesPages/MoviesPage";
// import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
// import NotFoundView from "./components/NotFoundView/NotFoundView";
import "./App.css";

//Dinamic imports
const HomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: 'HomePage' */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPages/MoviesPage" /* webpackChunkName: 'MoviesPage' */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: 'MovieDetailsPage' */
  )
);
const NotFoundView = lazy(() =>
  import(
    "./components/NotFoundView/NotFoundView" /* webpackChunkName: 'NotFoundView' */
  )
);

export default function App() {
  return (
    <Container>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
