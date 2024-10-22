import { API_URL } from '..';

export class BoardsService {
  static headers = {
    'Content-Type': 'application/json',
  };

  static async getAllBoards(): Promise<IBoard[]> {
    const response = await fetch(API_URL + '/boards');
    const data = await response.json();
    return data;
  }

  static async getBoardById(boardId: string): Promise<IBoard> {
    const response = await fetch(API_URL + `/boards/${boardId}`);
    const data = await response.json();
    return data;
  }

  static async getColumnById(
    boardId: string,
    columnId: string,
  ): Promise<IColumn> {
    const response = await fetch(
      API_URL + `/boards/${boardId}/columns/${columnId}`,
    );
    const data = await response.json();
    return data;
  }

  static async getTaskById(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Promise<ITask> {
    const response = await fetch(
      API_URL + `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    );
    const data = await response.json();
    return data;
  }

  static async addNewBoard(board: IBoard): Promise<IBoard[]> {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(board),
    });
    const data = response.json();
    return data;
  }

  static async addNewColumn(
    boardId: string,
    column: IColumn,
  ): Promise<IColumn[]> {
    const response = await fetch(`${API_URL}/boards/${boardId}/columns`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(column),
    });
    const data = response.json();
    return data;
  }

  static async addNewTask(
    boardId: string,
    columnId: string,
    task: ITask,
  ): Promise<ITask[]> {
    const response = await fetch(
      `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/`,
      {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(task),
      },
    );
    const data = response.json();
    return data;
  }

  static async updateBoard(board: IBoard): Promise<IBoard> {
    const response = await fetch(`${API_URL}/boards/${board.id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(board),
    });
    const data = response.json();
    return data;
  }

  static async updateColumn(
    boardId: string,
    column: IColumn,
  ): Promise<IColumn> {
    const response = await fetch(
      `${API_URL}/boards/${boardId}/columns/${column.id}`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(column),
      },
    );
    const data = response.json();
    return data;
  }

  static async updateTask(
    boardId: string,
    columnId: string,
    task: ITask,
  ): Promise<ITask> {
    const response = await fetch(
      `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${task.id}`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(task),
      },
    );
    const data = response.json();
    return data;
  }

  static async deleteBoard(boardId: string): Promise<IBoard[]> {
    const response = await fetch(`${API_URL}/boards/${boardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    const data = response.json();
    return data;
  }

  static async deleteColumn(
    boardId: string,
    columnId: string,
  ): Promise<IColumn[]> {
    const response = await fetch(
      `${API_URL}/boards/${boardId}/columns/${columnId}`,
      {
        method: 'DELETE',
        headers: this.headers,
      },
    );
    const data = response.json();
    return data;
  }

  static async deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Promise<ITask[]> {
    const response = await fetch(
      `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        method: 'DELETE',
        headers: this.headers,
      },
    );
    const data = response.json();
    return data;
  }
}
