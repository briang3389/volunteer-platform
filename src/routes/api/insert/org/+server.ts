import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { name, password, description } = await request.json();
	const query = {
		name: 'insert-org',
		text: 'INSERT INTO Organizations (name, password, description) VALUES ($1, $2, $3);',
		values: [name, password, description],
	}

	
	try {
		const res = (await pool.query(query));
		return new Response(JSON.stringify({ success: true}));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false }))
	}
	
}) satisfies RequestHandler;
