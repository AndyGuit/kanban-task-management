import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers';

export const useAppSelector = useSelector<RootState>;
