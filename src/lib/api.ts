import { MovieDetails, SearchResultMovie } from "./types";

export async function getMovies(category: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=es-ES`
    );

    if (response.ok) {
      const data = await response.json();

      return data.results as SearchResultMovie[];
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMovieDetails(movieId: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=es-ES`
    );

    if (response.ok) {
      const data = await response.json();

      return data as MovieDetails;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchMovies(query: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=es-ES`
    );

    if (response.ok) {
      const data = await response.json();

      return data.results as SearchResultMovie[];
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
