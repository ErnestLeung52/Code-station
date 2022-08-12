import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	// Ref: to get a reference to a component, or even any js value inside a component
	// No need below local state for redux
	// const [input, setInput] = useState('');
	const { updateCell, createBundle } = useActions();

	const bundle = useTypedSelector((state) => state.bundles![cell.id]);
	// No need local state since bundling result is now saved in the store
	// const [code, setCode] = useState('');
	// const [err, setErr] = useState('');

	// Connecting cells
	const cumulativeCode = useCumulativeCode(cell.id);

	// Debouncing
	// Take the input that users type and run ESbuild with transpiling and building process on it
	useEffect(() => {
		// handled bundling delay when refreshing page
		if (!bundle) {
			// Bundling all codes instead of one single cell
			createBundle(cell.id, cumulativeCode);
			return;
		}

		const timer = setTimeout(async () => {
			// const output = await bundle(cell.content);
			// Output of bundling process
			createBundle(cell.id, cumulativeCode);
			// setCode(output.code);
			// setErr(output.err);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, cell.id, createBundle]);

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 10px)',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Resizable direction='horizontal'>
					<CodeEditor
						// initialValue='const a = 1'
						initialValue={cell.content}
						// onChange={(value) => setInput(value)}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizable>
				{/* <textarea
				// Push updated value back into textarea, wire it up as control element
				value={input}
				onChange={(e) => setInput(e.target.value)}
			></textarea> */}
				{/* Pre element format text into code */}
				{/* <pre>{code}</pre> */}

				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-primary' max='100'>
								Loading...
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} err={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

// srcDoc Allows us to load content into iframe with local string, making request to outside URL

export default CodeCell;
