import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../widgets/Header';
import Container from '../shared/layout/Container';
import Modal from '../shared/ui/Modal/Modal';
import { UIActions, UISelectors } from './providers/StoreProvider';
import { BoardDragDrop } from '../features/Board';
import { Sidebar } from '../widgets/Sidebar';
import ModalContentForm from '../features/ModalFormContent/ui/ModalFormContent';

const App = () => {
  const dispatch = useDispatch();
  const isModal = useSelector(UISelectors.getIsModal);
  const closeModal = () => dispatch(UIActions.hideModal());

  return (
    <div className="App">
      <Header />
      <Container>
        <Sidebar />
        <BoardDragDrop />
      </Container>
      {isModal && (
        <Modal onClose={closeModal}>
          <ModalContentForm />
        </Modal>
      )}
    </div>
  );
};

export default App;
