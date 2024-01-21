import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb, getLoggedInOrgid } from '$lib/index';
import { generateQRCode } from '$lib/qr_gen';

export const POST = (async ({ request, cookies }) => {
	let eventid = await request.json();
	let orgid: Number | null = getLoggedInOrgid(cookies);
	if (orgid == null) {
		return new Response(JSON.stringify({ success: false, data: null }));
	}
	if (eventid == null) {
		return new Response(JSON.stringify({ success: false, data: null }));
	}
	let urlbuilder = new URL('http://localhost:5173/claim');
	urlbuilder.searchParams.append('orgid', orgid.toString());
	urlbuilder.searchParams.append('eventid', eventid.toString());

	try {
		let data = await generateQRCode(urlbuilder.toString(), 100, 100);
		return new Response(JSON.stringify({ success: true, data: data }));
	} catch (e) {
		return new Response(JSON.stringify({ success: false, data: null }));
	}
}) satisfies RequestHandler;
