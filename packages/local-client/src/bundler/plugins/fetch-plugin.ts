import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

// Cache responses: set & get an item inside a database
const fileCache = localforage.createInstance({
	name: 'filecachae',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			// Fetch for files

			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('I ran but nothing will happen');
				// Check to see if we have already fetched this file and if it is in the cache
				const cachedResult =
					await fileCache.getItem<esbuild.OnLoadResult>(args.path);
				// if it is, return it immediately
				if (cachedResult) {
					return cachedResult;
				}
				return null;
			});

			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);

				// Check if it's a css / jsx file
				// const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                    `;

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				// else store response in cache
				await fileCache.setItem(args.path, result);

				return result;
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				// console.log('onLoad', args);

				const { data, request } = await axios.get(args.path);

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				// else store response in cache
				await fileCache.setItem(args.path, result);

				return result;
			});
		},
	};
};
