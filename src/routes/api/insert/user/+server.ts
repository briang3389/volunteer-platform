import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { name, email, password, icon_url } = await request.json();
	const query = {
		name: 'insert-user',
		text: 'INSERT INTO Users (username, email, password, icon_url) VALUES ($1, $2, $3, $4);',
		values: [name, email, password, icon_url],
	}

	try {
		const res = (await pool.query(query));
		return new Response(JSON.stringify({ success: true }));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false }));
	}
	
}) satisfies RequestHandler;
