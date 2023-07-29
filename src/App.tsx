import BtnBoard from './components/Buttons/BtnBoard';

const App = () => {
  return (
    <div className="App dark">
      <BtnBoard type="select" text="select board" />
      <BtnBoard type="create" text="+create board" />
    </div>
  );
};

export default App;
