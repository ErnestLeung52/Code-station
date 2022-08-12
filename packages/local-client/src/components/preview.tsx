import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
	code: string;
	err: string;
}

// iframe HTML to show bundling result
const html = `
		<html>
			<head>
			</head>
			<body>
				<div id="root"> </div>
				<script>
					const handleError = (err) => {
						const root = document.querySelector('#root');
						root.innerHTML = '<div style="color: red;"> <h4>Runtime Error</h4> ' + err + '</div>'
						console.error(err)
					}

					window.addEventListener('error', (event) => {
						event.preventDefault()
						handleError(event.error)
					})

					window.addEventListener('message', (event) => {
						try {
							eval (event.data)
						} catch (err) {
							handleError(err)
						} 
					}, false)
				</script>
			</body>
		</html>
	`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		// Refresh iframe html to prevent variables leakage -> consistent environment
		iframe.current.srcdoc = html;
		// Code submit -> bundle code -> emit event to iframe -> iframe receive event
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(
				// result.outputFiles[0].text,
				code,
				'*'
			);
		}, 50);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe
				title='code preview'
				ref={iframe}
				sandbox='allow-scripts'
				srcDoc={html}
			/>
			{err && <div className='preview-error'>{err}</div>}
		</div>
	);
};

export default Preview;
