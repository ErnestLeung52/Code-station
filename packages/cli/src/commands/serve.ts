import { Command } from 'commander';

export const serveCommand = new Command()
	// [] not require by command
	.command('serve [filename]')
	.description('Open a file for editing')
	// <> required by commander
	.option('-p, --port <number>', 'port to run server on', '4005')
	.action((filename = 'notebook.js', options) => {
		console.log(filename, options);
	});
