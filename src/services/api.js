//Base url: https://api.themoviedb.org/3
//Url api: /movie/now_playing?api_key=f4a14a4c7ba74f928faf535bbd3b0d68&language=pt-BR

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export default api;
