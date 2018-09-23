import http from "./httpService";
import { baseUrl } from "../config.json";

const moviesUrl = baseUrl + "movies";

function getMovieUrl(id) {
  return moviesUrl + "/" + id;
}

export function getMovies() {
  return http.get(moviesUrl);
}

export async function getMovie(id) {
  const movies = await http.get(moviesUrl);
  return movies.data.find(m => m._id === id);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post(moviesUrl + "movies", movie);
}

export function deleteMovie(id) {
  http.delete(getMovieUrl(id));
}
