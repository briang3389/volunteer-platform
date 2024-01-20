import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { name, email, password } = await request.json();
	const query = {
		name: 'fetch-user',
		text: 'INSERT INTO Users (username, email, password) VALUES ($1, $2, $3);',
		values: [name, email, password],
	}

	const res = (await pool.query(query));
	try {
		return new Response(JSON.stringify({ command: res.command }));
	}
	catch (e) {
		throw error(500, "could not insert user");
	}
	
}) satisfies RequestHandler;
