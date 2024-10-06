import { Header } from '../widgets/Header';
import Container from '../shared/layout/Container';
import { BoardDragDrop } from '../features/Board';
import { Sidebar } from '../widgets/Sidebar';
import { ModalWithForms } from '../widgets/ModalWithForms';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Sidebar />
        <BoardDragDrop />
      </Container>
      <ModalWithForms />
    </div>
  );
};

export default App;
