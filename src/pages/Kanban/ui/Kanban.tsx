import { Container } from 'src/shared/layout';
import { ModalWithForms } from 'src/widgets/ModalWithForms';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { BoardDragDrop } from '../Board';

export function Kanban() {
  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <BoardDragDrop />
      </Container>
      <ModalWithForms />
    </>
  );
}
