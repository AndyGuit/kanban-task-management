import HeaderBoardInfo from './components/Header/HeaderBoardInfo/HeaderBoardInfo';
import HeaderLogo from './components/Header/HeaderLogo/HeaderLogo';
import {
  IconBoard,
  IconHideSidebar,
  IconPopupDots,
  IconShowSidebar,
} from './components/Icons/Icons';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import Button from './components/UI/Button';
import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';

const App = () => {
  const theme = useSelector((state: RootState) => state.ui.appTheme);
  return (
    <div className={`App ${theme}`}>
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
      {/* <Button btnStyle="show-sidebar">
        <IconShowSidebar />
      </Button> */}
      <Header />
      <Sidebar />
    </div>
  );
};

export default App;
