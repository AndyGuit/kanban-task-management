import { useSelector, useDispatch } from 'react-redux';
import Header from '../layout/Header/Header';
import Sidebar from '../layout/Sidebar/Sidebar';
import Board from '../layout/Board/Board';
import Container from '../shared/layout/Container';
import Modal from '../shared/ui/Modal/Modal';
import ModalContentForm from '../components/ModalForms/ModalContentForm';
import { useEffect } from 'react';
import { UIActions, UISelectors } from './providers/StoreProvider';
import { BoardDragDrop } from '../features/Board/ui/BoardDragDrop/BoardDragDrop';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector(UISelectors.getTheme);
  const isModal = useSelector(UISelectors.getIsModal);
  const closeModal = () => dispatch(UIActions.hideModal());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
