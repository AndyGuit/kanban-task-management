import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../constants/api';

export enum RTKTagTypes {
  Boards = 'Boards',
}

export const boardsServiceRTK = createApi({
  reducerPath: 'boardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [RTKTagTypes.Boards],
  endpoints: (build) => ({
    fetchAllBoards: build.query<IBoard[], null>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_ = null) => ({
        url: '/boards',
      }),
      providesTags: () => [RTKTagTypes.Boards],
    }),
    addNewBoard: build.mutation<IBoard[], IBoard>({
      query: (newBoard) => ({
        url: '/boards',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBoard),
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),
  }),
});
