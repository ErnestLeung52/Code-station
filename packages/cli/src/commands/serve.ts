import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
	// [] not require by command
	.command('serve [filename]')
	.description('Open a file for editing')
	// <> required by commander
	.option('-p, --port <number>', 'port to run server on', '4005')
	.action(async (filename = 'notebook.js', options: { port: string }) => {
		try {
			// cwd return where the user is typing the command from, dirname return the folder it in
			const dir = path.join(process.cwd(), path.dirname(filename));
			// basename gives the file name
			const fileName = path.basename(filename);
			// Sending options info from CLI to local-api
			await serve(parseInt(options.port), fileName, dir);
			console.log(
				`Opened ${fileName}. Navigate to http://localhost:${options.port} to edit the file.`
			);
		} catch (error: any) {
			if (error.code === 'EADDRINUSE') {
				console.error('PORT is in use. Trying running on a different port.');
			} else {
				console.log('Here is the problem', error.message);
			}
			process.exit(1);
		}
	});
