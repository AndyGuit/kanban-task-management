import { Provider } from 'react-redux';
import { store } from '../store/store';

interface Props {
  children?: React.ReactNode;
}

export const StoreProvider = (props: Props) => {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
};
