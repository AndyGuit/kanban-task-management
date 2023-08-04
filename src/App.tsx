import { useSelector } from 'react-redux';
import { RootState } from './store/index';
import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';
import Board from './layout/Board/Board';
import Container from './components/UI/Container';

const App = () => {
  const theme = useSelector((state: RootState) => state.ui.appTheme);
  return (
    <div className={`App ${theme}`}>
      <Header />
      <Container>
        <Sidebar />
        <Board />
      </Container>
    </div>
  );
};

export default App;
