import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { username, email, password, icon_url, name } = await request.json();
	const query = {
		name: 'insert-user',
		text: 'INSERT INTO Users (username, email, password, icon_url, name) VALUES ($1, $2, $3, $4, $5);',
		values: [username, email, password, icon_url, name],
	}

	try {
		const res = (await pool.query(query));
		return new Response(JSON.stringify({ success: true }));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false }));
	}
	
}) satisfies RequestHandler;
