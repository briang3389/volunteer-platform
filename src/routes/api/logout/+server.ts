import type { RequestHandler } from '@sveltejs/kit';
import { getLoggedInId, deleteCookie } from '$lib';

export const POST = (async ({ request, cookies }) => {
	deleteCookie(cookies);
	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
