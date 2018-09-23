import http from "./httpService";
import config from "../config.json";
export async function getGenres() {
  const genres = await http.get(config.baseUrl + "genres");
  return genres.data;
}
