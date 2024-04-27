import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "6e662dec114f18736bafeb49ccd5fe2c";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTJlZDY0N2FlMTcxNWUxZGQ0N2YzMmIzNGE3NWIxMiIsInN1YiI6IjY2MmNlNTc2NzEzZWE2MDEyODY4MmNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.drB6Xy53zPuCARu8HdhwxjB_t8WWOtQXnkbwC8GuvwE";

const options = {
  headers: {
    Authorization: API_TOKEN,
  },
  include_adult: false,
  language: "en",
  page: 1,
};

export const getTrendMovie = async () => {
  const response = await axios.get("/trending/movie/day", {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      options,
      query: query,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};
