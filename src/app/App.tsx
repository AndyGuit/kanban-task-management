import { Header } from 'src/widgets/Header';
import Container from 'src/shared/layout/Container';
import { BoardDragDrop } from 'src/features/Board';
import { Sidebar } from 'src/widgets/Sidebar';
import { ModalWithForms } from 'src/widgets/ModalWithForms';

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
