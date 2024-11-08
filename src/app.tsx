import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect,
} from "react-router-dom";
import { Movies, loader as moviesLoader } from "./routes/movies";
import {
  MovieDetail,
  loader as movieDetailsLoader,
  ErrorBoundary as MovieDetailsErrorBoundary,
} from "./routes/movie-detail";
import { Layout } from "./routes/layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,

    children: [
      {
        index: true,
        loader: function rootLoader() {
          return redirect("/movies");
        },
      },
      {
        path: "/movies",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Movies />,
            loader: moviesLoader,
          },
          {
            path: ":movieId",
            element: <MovieDetail />,
            loader: movieDetailsLoader,
            errorElement: <MovieDetailsErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
