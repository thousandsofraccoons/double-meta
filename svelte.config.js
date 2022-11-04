import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		preserve: ['ld+json']
	}),

	kit: {
		adapter: vercel(),
		alias: {
			// these are the aliases and paths to them
			'~config': 'src/config',
			'~components': 'src/components',
			'~stores': 'src/stores',
			'~utils': 'src/utils',
			'~types': 'src/types'
		}
	}
};

export default config;
