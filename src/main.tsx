import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/styles/index.scss';
import store from './store/index';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
