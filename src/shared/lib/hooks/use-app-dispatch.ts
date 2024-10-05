import { useDispatch } from 'react-redux';
import store from '../../../app/providers/StoreProvider/config/store';

export const useAppDispatch = useDispatch<typeof store.dispatch>;
