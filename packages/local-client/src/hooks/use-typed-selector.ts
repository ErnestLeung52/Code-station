import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

// Use useTypedSelector to acces state when inside a component
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
