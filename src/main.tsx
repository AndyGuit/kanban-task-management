import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/styles/index.scss';
import store from './store/index';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from './app/providers/DragDropContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DragDropContextProvider>
      <App />
    </DragDropContextProvider>
  </Provider>
);
