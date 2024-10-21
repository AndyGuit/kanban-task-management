/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
// const bodyParser = require('body-parser');

server.use(
  jsonServer.defaults({
    bodyParser: true,
  }),
);
server.use(middlewares);
// server.use(bodyParser.json());

// Utility function to generate unique IDs
function generateId(items) {
  return items.length
    ? Math.max(
        ...items.map((item) => parseInt(item.id.replace(/\D/g, '') || 0)),
      ) + 1
    : 1;
}

// -------------------- GET METHODS --------------------
server.get('/boards/:boardId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({ error: 'Board not found' });
  }
});

server.get('/boards/:boardId/columns', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (board) {
    res.json(board.columns);
  } else {
    res.status(404).json({ error: 'Board not found' });
  }
});

server.get('/boards/:boardId/columns/:columnId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (board) {
    const column = board.columns.find((c) => c.id === req.params.columnId);
    if (column) {
      res.json(column);
    } else {
      res.status(404).json({ error: 'Column not found' });
    }
  } else {
    res.status(404).json({ error: 'Board not found' });
  }
});

server.get('/boards/:boardId/columns/:columnId/tasks', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (board) {
    const column = board.columns.find((c) => c.id === req.params.columnId);
    if (column) {
      res.json(column.tasks);
    } else {
      res.status(404).json({ error: 'Column not found' });
    }
  } else {
    res.status(404).json({ error: 'Board not found' });
  }
});

server.get('/boards/:boardId/columns/:columnId/tasks/:taskId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (board) {
    const column = board.columns.find((c) => c.id === req.params.columnId);
    if (column) {
      const task = column.tasks.find((t) => t.id === req.params.taskId);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } else {
      res.status(404).json({ error: 'Column not found' });
    }
  } else {
    res.status(404).json({ error: 'Board not found' });
  }
});

// -------------------- PUT METHODS --------------------
// Add a new board
server.put('/boards', (req, res) => {
  const boards = router.db.get('boards').value();
  const newBoard = req.body;
  // set all old boards as inactive
  const inactiveBoards = boards.map((board) => ({ ...board, isActive: false }));

  // Generate ID if not provided
  if (!newBoard.id) {
    newBoard.id = 'b' + generateId(boards);
  }

  // Add new board to the array
  inactiveBoards.push(newBoard);
  router.db.set('boards', inactiveBoards).write();
  res.json(boards);
});

// Add a new column to an existing board
server.put('/boards/:boardId/columns', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  const newColumn = req.body;

  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }

  // Generate ID if not provided
  if (!newColumn.id) {
    newColumn.id = 'c' + generateId(board.columns);
  }

  // Add new column to the board
  board.columns.push(newColumn);
  router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .assign(board)
    .write();
  res.json(board.columns);
});

// Add a new task to an existing column
server.put('/boards/:boardId/columns/:columnId/tasks', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }

  const column = board.columns.find((c) => c.id === req.params.columnId);
  if (!column) {
    return res.status(404).json({ error: 'Column not found' });
  }

  const newTask = req.body;

  // Generate ID if not provided
  if (!newTask.id) {
    newTask.id = 't' + generateId(column.tasks);
  }

  // Add new task to the column
  column.tasks.push(newTask);
  router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .assign(board)
    .write();
  res.json(column.tasks);
});

// -------------------- PATCH METHODS --------------------

// Update a specific board
server.patch('/boards/:boardId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();

  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }
  const boards = router.db.get('boards').value();
  const inactiveBoards = boards.map((board) => ({ ...board, isActive: false }));
  router.db.set('boards', inactiveBoards).write();
  const updatedBoard = req.body;
  router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .assign(updatedBoard)
    .write();
  res.json(updatedBoard);
});

// Update a specific column
server.patch('/boards/:boardId/columns/:columnId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }

  const column = board.columns.find((c) => c.id === req.params.columnId);
  if (!column) {
    return res.status(404).json({ error: 'Column not found' });
  }

  const updatedColumn = _.merge(column, req.body);
  router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .assign(board)
    .write();
  res.json(updatedColumn);
});

// Update a specific task
server.patch('/boards/:boardId/columns/:columnId/tasks/:taskId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }

  const column = board.columns.find((c) => c.id === req.params.columnId);
  if (!column) {
    return res.status(404).json({ error: 'Column not found' });
  }

  const task = column.tasks.find((t) => t.id === req.params.taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = _.merge(task, req.body);
  router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .assign(board)
    .write();
  res.json(updatedTask);
});

// -------------------- DELETE METHODS --------------------
// Delete a specific board
server.delete('/boards/:boardId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }

  const updatedBoards = router.db
    .get('boards')
    .remove({ id: req.params.boardId })
    .write();
  const boards = router.db.get('boards').value();
  boards[0].isActive = true;
  router.db.set('boards', boards);
  res.json(updatedBoards);
});

// Delete a specific column
server.delete('/boards/:boardId/columns/:columnId', (req, res) => {
  const board = router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .value();
  if (!board) {
    return res.status(404).json({ error: 'Board not found' });
  }

  const updatedColumns = board.columns.filter(
    (c) => c.id !== req.params.columnId,
  );
  board.columns = updatedColumns;
  router.db
    .get('boards')
    .find({ id: req.params.boardId })
    .assign(board)
    .write();
  res.json(updatedColumns);
});

// Delete a specific task
server.delete(
  '/boards/:boardId/columns/:columnId/tasks/:taskId',
  (req, res) => {
    const board = router.db
      .get('boards')
      .find({ id: req.params.boardId })
      .value();
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const column = board.columns.find((c) => c.id === req.params.columnId);
    if (!column) {
      return res.status(404).json({ error: 'Column not found' });
    }

    const updatedTasks = column.tasks.filter((t) => t.id !== req.params.taskId);
    column.tasks = updatedTasks;
    router.db
      .get('boards')
      .find({ id: req.params.boardId })
      .assign(board)
      .write();
    res.json(updatedTasks);
  },
);

// Use default router for other routes
server.use(router);

server.listen(
  {
    port: 1234,
  },
  () => {
    console.log('Kanban Boards Server is running on http://localhost:1234');
  },
);
