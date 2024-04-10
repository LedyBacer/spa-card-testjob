import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    baseUrl: 'https://www.omdbapi.com/',
  }),
  endpoints: builder => ({
    getLoveMovies: builder.query<ListResponse<Films>, number | void>({
      query: (page = 1) => `?apikey=c48698ed&type=movie&s=Love&page=${page}`,
    }),
    getMovieByID: builder.query<Film, string | void>({
      query: (imdbID = 'tt0120611') => `?apikey=c48698ed&i=${imdbID}`,
    }),
  }),
});

export const { useGetLoveMoviesQuery, useGetMovieByIDQuery } = filmsApi;
