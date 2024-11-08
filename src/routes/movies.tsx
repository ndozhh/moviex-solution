import { MovieCard } from "@/components/movie-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getMovies, searchMovies } from "@/lib/api";
import { SearchResultMovie } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  json,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const categories = [
  {
    label: "En cartelera",
    value: "now_playing",
  },
  {
    label: "Populares",
    value: "popular",
  },
  {
    label: "Mejor valoradas",
    value: "top_rated",
  },
  {
    label: "Próximamente",
    value: "upcoming",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("query");

  if (!category) {
    return redirect("/movies?category=now_playing");
  }

  if (query) {
    const movies = await searchMovies(query);

    return json({
      movies: movies.filter(
        (movie) =>
          movie.poster_path &&
          movie.vote_average > 3.0 &&
          movie.vote_count > 0 &&
          movie.overview
      ),
    });
  }

  const movies = await getMovies(category);

  return json({
    movies: movies.filter(
      (movie) =>
        movie.poster_path &&
        movie.vote_average > 3.0 &&
        movie.vote_count > 0 &&
        movie.overview
    ),
  });
}

export function Movies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { movies } = useLoaderData() as {
    movies: SearchResultMovie[];
  };
  const selectedCategory = searchParams.get("category");

  return (
    <div className="bg-cyan-600 overflow-auto p-10">
      <RadioGroup
        value={selectedCategory ?? ""}
        onValueChange={(value) => {
          navigate(`/movies?category=${value}`);
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {categories.map(({ value, label }) => (
          <div key={value} className="relative">
            <RadioGroupItem
              value={value}
              id={value}
              className="peer absolute inset-0 opacity-0"
            />
            <label
              htmlFor={value}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors peer-checked:border-primary peer-checked:text-primary",
                {
                  "bg-orange-300": selectedCategory === value,
                }
              )}
            >
              <span className="font-medium">{label}</span>
            </label>
          </div>
        ))}
      </RadioGroup>
      <div className="w-full grid grid-cols-5 auto-rows-max gap-4">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="flex">
            <MovieCard
              title={movie.title}
              poster_path={movie.poster_path}
              overview={movie.overview}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
