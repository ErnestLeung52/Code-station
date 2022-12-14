import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { Fragment, useEffect } from 'react';
import './cell-list.css';
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) => {
		return order.map((id) => {
			return data[id];
		});
	});

	const { fetchCells } = useActions();

	useEffect(() => {
		fetchCells();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellId='cell.id' />
		</Fragment>
	));

	return (
		<div className='cell-list'>
			{/* <div className={cells.length === 0 ? 'force-visible' : ''}> */}
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
			{/* </div> */}
		</div>
	);
};

export default CellList;
