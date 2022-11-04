import { redirect } from '@sveltejs/kit';
import { register, init, waitLocale } from 'svelte-intl-precompile';

register('en', () => import('$locales/en'));
register('ru', () => import('$locales/de'));

export async function load(ctx: any) {
	const {
		locals,
		params,
		url: { pathname }
	} = ctx;


	init({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});
	await waitLocale();
	// console.log('initialLocale, params :>> ', initialLocale, params);
	if (pathname === '/' && params.lang !== 'en') {
		throw redirect(301, `/en`)
	}
}
