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

export const filmsApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.omdbapi.com/',
  }),
  endpoints: builder => ({
    getLoveMovies: builder.query<ListResponse<Films>, number | void>({
      query: (page = 1) => `?apikey=c48698ed&type=movie&s=Love&page=${page}`,
    }),
  }),
});

export const { useGetLoveMoviesQuery } = filmsApi;
