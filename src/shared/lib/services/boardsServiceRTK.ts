import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../constants/api';

export enum RTKTagTypes {
  Boards = 'Boards',
  Columns = 'Columns',
  Tasks = 'Tasks',
}

export const boardsServiceRTK = createApi({
  reducerPath: 'boardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [RTKTagTypes.Boards, RTKTagTypes.Columns, RTKTagTypes.Tasks],
  endpoints: (build) => ({
    fetchAllBoards: build.query<IBoard[], null>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_ = null) => ({
        url: '/boards',
      }),
      providesTags: () => [RTKTagTypes.Boards],
    }),
    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
      }),
      providesTags: () => [RTKTagTypes.Boards],
    }),
    getColumnById: build.query<IColumn, { boardId: string; columnId: string }>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}`,
      }),
      providesTags: () => [RTKTagTypes.Columns],
    }),
    getTaskById: build.query<
      ITask,
      { boardId: string; columnId: string; taskId: string }
    >({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
      }),
      providesTags: () => [RTKTagTypes.Tasks],
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

    addNewColumn: build.mutation<
      IColumn,
      { boardId: string; columnId: string }
    >({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [RTKTagTypes.Columns],
    }),

    addNewTask: build.mutation<
      ITask,
      { boardId: string; columnId: string; task: ITask }
    >({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params.task),
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),

    updateAllBoards: build.mutation<IBoard[], IBoard[]>({
      query: (boards) => ({
        url: '/boards',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boards),
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),

    updateBoard: build.mutation<IBoard, IBoard>({
      query: (board) => ({
        url: `/boards/${board.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),

    updateColumn: build.mutation<IColumn, { boardId: string; column: IColumn }>(
      {
        query: ({ boardId, column }) => ({
          url: `/boards/${boardId}/columns/${column.id}`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(column),
        }),
        invalidatesTags: [RTKTagTypes.Boards],
      },
    ),

    updateTask: build.mutation<IColumn, { boardId: string; task: ITask }>({
      query: ({ boardId, task }) => ({
        url: `/boards/${boardId}/columns/${task.statusId}/tasks/${task.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),

    deleteBoard: build.mutation<IBoard[], string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),

    deleteColumn: build.mutation<
      IColumn[],
      { boardId: string; columnId: string }
    >({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [RTKTagTypes.Columns],
    }),

    deleteTask: build.mutation<
      ITask[],
      { boardId: string; columnId: string; taskId: string }
    >({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [RTKTagTypes.Boards],
    }),
  }),
});
