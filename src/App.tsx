import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/index';
import Header from './layout/Header/Header';
import Sidebar from './layout/Sidebar/Sidebar';
import Board from './layout/Board/Board';
import Container from './components/UI/Container';
import Modal from './components/UI/Modal';
import ModalContentForm from './components/ModalForms/ModalContentForm';
import { uiActions } from './store/slices/ui-slice';
import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dataActions } from './store/slices/data-slice';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.appTheme);
  const isModal = useSelector((state: RootState) => state.ui.modal.isVisible);
  const closeModal = () => dispatch(uiActions.hideModal());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If user drops outside of the list
    if (!destination) return;

    // if task dropped on the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // if card dropped on same column
    if (destination.droppableId === source.droppableId) {
      dispatch(dataActions.setSelectedColumn(destination.droppableId));
      dispatch(dataActions.setSelectedTask(draggableId));
      dispatch(dataActions.removeTask(draggableId));
      dispatch(dataActions.insertSelectedTask(destination.index));
      dispatch(dataActions.saveChanges('column'));
    }

    // if card dropped on other column
    if (destination.droppableId !== source.droppableId) {
      dispatch(dataActions.setSelectedColumn(source.droppableId));
      dispatch(dataActions.setSelectedTask(draggableId));
      dispatch(dataActions.removeTask(draggableId));
      dispatch(dataActions.saveChanges('column'));
      dispatch(dataActions.setSelectedColumn(destination.droppableId));
      dispatch(dataActions.setNewTaskStatus());
      dispatch(dataActions.insertSelectedTask(destination.index));
      dispatch(dataActions.saveChanges('column'));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
};

export default App;
