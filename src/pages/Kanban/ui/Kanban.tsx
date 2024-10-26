import { Container } from 'src/shared/layout';
import { ModalWithForms } from '../ModalWithForms';
import { BoardRTK } from '../Board';
import { HeaderRTK } from './Header/HeaderRTK';
import { SidebarRTK } from './Sidebar/SidebarRTK';

export function Kanban() {
  return (
    <>
      <HeaderRTK />
      <Container>
        <SidebarRTK />
        <BoardRTK />
      </Container>
      <ModalWithForms />
    </>
  );
}
