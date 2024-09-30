import { useSelector, useDispatch } from 'react-redux';
import Header from '../layout/Header/Header';
import Sidebar from '../layout/Sidebar/Sidebar';
import Board from '../layout/Board/Board';
import Container from '../shared/layout/Container';
import Modal from '../shared/ui/Modal/Modal';
import ModalContentForm from '../components/ModalForms/ModalContentForm';
import { uiActions } from '../store/slices/ui-slice';
import { useEffect } from 'react';
import { getIsModal, getTheme } from '../store/selectors/ui-selectors';
import { DragDropContextProvider } from './providers/DragDropContext';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const isModal = useSelector(getIsModal);
  const closeModal = () => dispatch(uiActions.hideModal());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <DragDropContextProvider>
      <div className="App">
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
    </DragDropContextProvider>
  );
};

export default App;
