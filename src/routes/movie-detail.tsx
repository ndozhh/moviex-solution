import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getMovieDetails } from "@/lib/api";
import { MovieDetails } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  isRouteErrorResponse,
  json,
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useRouteError,
} from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  const movieId = params.movieId;

  const movie = await getMovieDetails(movieId!);

  if (!movie) {
    throw json("La película no existe", {
      status: 404,
    });
  }

  return json({
    movie,
  });
}
export function MovieDetail() {
  const { movie } = useLoaderData() as {
    movie: MovieDetails;
  };
  const [data, setData] = useState({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);

    setData(values);
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 p-10">
      <Link to="/movies" className="flex items-center text-2xl font-semibold">
        <ArrowLeft />
        Regresar
      </Link>
      <div className="flex w-full h-full gap-16">
        <div className="w-80 h-max">
          <MovieCard
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
          />
        </div>
        <div className="flex flex-col gap-4 w-full max-w-72">
          <span className="text-2xl font-semibold">Agrega tu reseña</span>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input name="name" placeholder="Ingresa tu nombre" required />
            <Input
              name="rating"
              type="number"
              min={1}
              max={10}
              required
              placeholder="Ingresa tu calificación"
            />
            <Textarea
              name="comments"
              required
              placeholder="Ingresa tu reseña"
            />
            <Button type="submit">Enviar reseña</Button>
          </form>
          <pre className="mt-10">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center text-3xl">
        <span className="text-cyan-600">{error.data}</span>
        <Link to="/movies" className="flex items-center text-2xl font-semibold">
          <ArrowLeft />
          Regresar
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-3xl">
      <span>Ocurrió un error inesperado</span>
    </div>
  );
}
