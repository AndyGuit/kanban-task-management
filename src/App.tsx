import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/index';
import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';
import Board from './layout/Board/Board';
import Container from './components/UI/Container';
import Modal from './components/UI/Modal';
import ModalContentForm from './components/ModalForms/ModalContentForm';
import { uiActions } from './store/slices/ui-slice';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.appTheme);
  const isModal = useSelector((state: RootState) => state.ui.modal.isVisible);
  const closeModal = () => dispatch(uiActions.hideModal());

  return (
    <div className={`App ${theme}`}>
      <Header />
      <Container>
        <Sidebar />
        <Board />
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
