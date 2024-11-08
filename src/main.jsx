import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app";
import Home from "./pages/home";
import Genres from "./pages/genres";
import Movies from "./pages/movies";
import MovieDetail from "./pages/movie-detail";
import Watchlist from "./pages/watchlist";
import Watched from "./pages/watched";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

import MoviesByGenrePage from "./pages/movies-by-genre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/movies", element: <Movies /> },
      { path: "/:type/:id", element: <MovieDetail /> },
      { path: "/watchlist", element: <Watchlist /> },
      { path: "/watched", element: <Watched /> },
      { path: "/genres", element: <Genres /> },
      { path: "/genres/:id", element: <MoviesByGenrePage /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
