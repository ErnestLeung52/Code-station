import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import { ActionType } from './action-types';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(
	reducers,
	{},
	applyMiddleware(persistMiddleware, thunk)
);

// Hard Coded Default Page
// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'code',
// 	},
// });

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'text',
// 	},
// });
