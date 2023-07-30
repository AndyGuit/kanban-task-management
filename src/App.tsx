import HeaderBoardInfo from './components/Header/HeaderBoardInfo/HeaderBoardInfo';
import HeaderLogo from './components/Header/HeaderLogo/HeaderLogo';
import {
  IconBoard,
  IconHideSidebar,
  IconPopupDots,
} from './components/Icons/Icons';
import Button from './components/UI/Button';

const App = () => {
  return (
    <div className="App dark">
      {/* <Button btnStyle="select-board">
        <IconBoard />
        Select Board
      </Button>
      <Button btnStyle="create-board">
        <IconBoard />+ Create Board
      </Button>
      <Button btnStyle="add-task">+ Add new task</Button>
      <Button btnStyle="form-primary">Save Changes</Button>
      <Button btnStyle="form-secondary">+ Add New Task</Button>
      <Button btnStyle="hide-sidebar">
        <IconHideSidebar />
        Hide Sidebar
      </Button>
      <Button btnStyle="text-primary">Edit Board</Button>
      <Button btnStyle="text-warning">Delete Board</Button>
      <Button btnStyle="add-column">+ New Column</Button>
      <Button btnStyle="popup">
        <IconPopupDots />
      </Button> */}
      <header>
        <HeaderLogo />
        <HeaderBoardInfo boardName="board name" />
      </header>
    </div>
  );
};

export default App;
