// Handle multiple code editors in codestation -> execute bundling logic inside different components, so this can be use in multiple components in our file
// Wrap up all the logic from esBuild

import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

// Tell esbuild to fetch the Web Assembly bundle from public directory file.
// const service = await esbuild.startService({
// After calling start service, we can refer to ref.current anywhere inside our component, so that it can give us a reference to service we created through esbuild, then we can use that to do transpiling and bundling

// rawCode -> input code from user
const bundle = async (rawCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	}

	// Transpile convert to bundle process

	try {
		const result = await service.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
			jsxFactory: '_React.createElement',
			jsxFragment: '_React.Fragment'
		});

		// Output of bundling process
		return { code: result.outputFiles[0].text, err: '' };
	} catch (err: any) {
		return {
			code: '',
			err: err.message,
		};
	}
};

export default bundle;
