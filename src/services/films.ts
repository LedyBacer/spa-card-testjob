import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface Films {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ListResponse<T> {
  Response: boolean;
  totalResults: number;
  Search: T[];
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface Film {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getLoveMovies: builder.query<ListResponse<Films>, number | void>({
      query: (page = 1) => `?apikey=${API_KEY}&type=movie&s=Love&page=${page}`,
    }),
    getMovieByID: builder.query<Film, string | void>({
      query: (imdbID = 'tt0120611') => `?apikey=${API_KEY}&i=${imdbID}`,
    }),
  }),
});

export const { useGetLoveMoviesQuery, useGetMovieByIDQuery } = filmsApi;
