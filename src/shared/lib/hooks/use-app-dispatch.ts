import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/providers/StoreProvider/store/store';

export const useAppDispatch = useDispatch<AppDispatch>;
