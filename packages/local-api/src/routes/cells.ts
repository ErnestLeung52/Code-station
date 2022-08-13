import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
	id: string;
	content: string;
	type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();
	router.use(express.json());

	const fullPath = path.join(dir, filename);

	router.get('/cells', async (req, res) => {
		// Makre sure the cell storage file exists, if not, add in a default list of cells
		// Read the file, parse a list of cells out of it

		try {
			const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

			res.send(JSON.parse(result));
		} catch (error: any) {
			if (error.code === 'ENOENT') {
				// Add Code to create a file and add default cells
				await fs.writeFile(fullPath, '[]', 'utf-8');

				res.send([]);
			} else {
				throw error;
			}
		}
	});

	router.post('/cells', async (req, res) => {
		// Tkae the list of cells from the request obj -> serialize them
		const { cells }: { cells: Cell[] } = req.body;

		// Write the cells into the file
		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

		res.send({ status: 'ok' });
	});

	return router;
};
