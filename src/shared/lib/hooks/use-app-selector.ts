import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/store/store';

export const useAppSelector = useSelector<RootState>;
