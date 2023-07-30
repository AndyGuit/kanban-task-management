import { IconBoard } from './components/Icons/Icons';
import Button from './components/UI/Button';

const App = () => {
  return (
    <div className="App dark">
      <Button btnStyle="select-board">
        {<IconBoard />}
        Select Board
      </Button>
      <Button btnStyle="create-board">{<IconBoard />}+ Create Board</Button>
      <Button btnStyle="add-task">+ Add new task</Button>
      <Button btnStyle="form-primary">Save Changes</Button>
      <Button btnStyle="form-secondary">+ Add New Task</Button>
    </div>
  );
};

export default App;
