import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { userid } = await request.json();
	const query = {
		name: 'get-user',
		text: 'SELECT username, email FROM Users WHERE userid = $1;',
		values: [userid],
	}

	
	try {
		const res = await (await pool.query(query)).rows;
		return new Response(JSON.stringify({ success: true, data: res}));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false, data: []}))
	}
	
}) satisfies RequestHandler;
