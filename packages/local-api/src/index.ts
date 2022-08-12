import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
	const app = express();

	// Solve the problem with try/catch in serve.ts by creating a new promise
	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};
