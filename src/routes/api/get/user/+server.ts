import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';
import { getLoggedInId } from '$lib/index';

export const POST = (async ({ request, cookies } ) => {
	const pool: pg.Pool= await getDb();
	let { username }  = await request.json();
	const query = {
		name: 'get-user',
		text: 'SELECT email, icon_url, name FROM Users WHERE username = $1;',
		values: [username],
	}

	try {
		const res = await (await pool.query(query)).rows;
		return new Response(JSON.stringify({ success: true, data: res}));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false, data: []}))
	}
	
}) satisfies RequestHandler;
