import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Función para obtener la URL de la imagen del poster de una película.
 *
 * @example
 * ```tsx
 * const url = getPosterUrl("/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg", 300);
 * // https://image.tmdb.org/t/p/w500/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg
 * ```
 *
 * @param posterPath Ruta del poster de la película el cual se ve así `/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg` y llega en la llave `poster_path`.
 * @param width Ancho deseado de la imagen.
 * @returns URL de la imagen del poster.
 */
export function getPosterUrl(posterPath: string, width: number = 200) {
  return `https://image.tmdb.org/t/p/w${width}${posterPath}`;
}
