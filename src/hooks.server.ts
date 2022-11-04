import type { Handle } from '@sveltejs/kit/types/internal';
import { minify } from 'html-minifier';

const directives = {
	'img-src': ['*', "'self'", 'data:'],
	'font-src': ['*', "'self'", 'data:'],
	'style-src': ["'self'", "'unsafe-inline'", 'https://*.googleapis.com', 'https://*.google.com'],
	'connect-src': [
		"'self'",
		'https://api.giphy.com',
		'https://*.google.com',
		'https://*.googleapis.com',
		"https://*.google-analytics.com/",
	],
	'default-src': [
		"'self'",
		'https://*.google.com',
		'https://*.googleapis.com',
		'https://*.gstatic.com',
		"https://*.googletagmanager.com",
	],
	'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://*.googletagmanager.com", 'https://*.google.com']

};

const CSP = Object.entries(directives)
	.map(([key, arr]) => key + ' ' + arr.join(' '))
	.join('; ');

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: false,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

export const handle: Handle = async (ctx: any) => {
	const { event, resolve } = ctx;
	const response = await resolve(event);

	if (response.status === 304) return response;
	if (event.url.href.endsWith('.txt')) {
		response.headers.append('content-type', 'text/plain; charset=utf-8');
	}

	response.headers.append('X-Content-Type-Options', 'nosniff');
	response.headers.append('X-Frame-Options', 'DENY');
	// response.headers.append('Cache-Control', 'max-age=60, stale-while-revalidate=180')
	response.headers.append('Content-Security-Policy', CSP);
	const isHTMLRequest = response.headers.get('content-type') === 'text/html'
	const responseText = await response.text()
	const responseBody = isHTMLRequest ? minify(responseText, minification_options) : responseText; //Minifies the response.body

	return new Response(responseBody, {
		status: response.status,
		headers: response.headers
	});
};

export async function getSession(ctx: any) {
	const acceptLanguage = ctx.request.headers.get('accept-language')?.substring(0, 2);
	const locale = supportedLanguages.includes(acceptLanguage) ? acceptLanguage : 'en';
	const cookies = ctx.request.headers.get('cookie');

	return {
		cookies,
		locale,
		isBot: /bot|google|baidu|bing|msn|teoma|slurp|yandex/i.test(
			ctx.request.headers.get('user-agent')
		)
	};
}
