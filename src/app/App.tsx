import { useSelector, useDispatch } from 'react-redux';
import Header from '../layout/Header/Header';
import Container from '../shared/layout/Container';
import Modal from '../shared/ui/Modal/Modal';
import ModalContentForm from '../components/ModalForms/ModalContentForm';
import { UIActions, UISelectors } from './providers/StoreProvider';
import { BoardDragDrop } from '../features/Board';
import { Sidebar } from '../widgets/Sidebar';

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
