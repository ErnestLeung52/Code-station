import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean
) => {
	const app = express();

	if (useProxy) {
		app.use(
			createProxyMiddleware('', {
				target: 'http://127.0.0.1:3000',
				// Enable websocket support (tell web browser development has been changed)
				ws: true,
				logLevel: 'silent',
				changeOrigin: true,
			})
		);
	} else {
		// Serve up all files from this directory
		const packagePath = require.resolve('local-client/build/index.html');
		app.use(express.static(path.dirname(packagePath)));
	}

	app.use(createCellsRouter(filename, dir));

	// Solve the problem with try/catch in serve.ts by creating a new promise
	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};
