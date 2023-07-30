import BtnBoard from './components/Buttons/BtnBoard/BtnBoard';
import Button from './components/UI/Button';

const App = () => {
  return (
    <div className="App dark">
      <BtnBoard type="select" text="select board" />
      <BtnBoard type="create" text="+create board" />
      <Button btnStyle="add-task">+ Add new task</Button>
    </div>
  );
};

export default App;
