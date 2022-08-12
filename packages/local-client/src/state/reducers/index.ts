import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
	cells: cellsReducer,
	bundles: bundlesReducer,
});

export default reducers;

// For applying types for useSelector hook for React/Redux
// Types that define overall structure of state object inside redux store
export type RootState = ReturnType<typeof reducers>;
