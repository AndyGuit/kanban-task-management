import { BoardDragDrop } from 'src/features/Board';
import { Container } from 'src/shared/layout';
import { ModalWithForms } from 'src/widgets/ModalWithForms';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export function Kanban() {
  return (
    <div>
      <Header />
      <Container>
        <Sidebar />
        <BoardDragDrop />
      </Container>
      <ModalWithForms />
    </div>
  );
}
