import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { useMemo } from 'react';

// Custom hook that helps to make calling action easier

export const useActions = () => {
	const dispatch = useDispatch();

	// UseEffect from create Bundle in code-cell get rerendered every 1s because everytime we call useActions we get back a slightly different version of createBundle actionCreators because we are rebinding with every single rerender of a component
	// We only want to bind actionCreator one single time -> useMemo

	return useMemo(() => {
		return bindActionCreators(actionCreators, dispatch);
	}, [dispatch]);
};
