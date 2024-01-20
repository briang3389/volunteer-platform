import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { name, description, startdate, enddate, location, orgid } = await request.json();
	const query = {
		name: 'insert-event',
		text: 'INSERT INTO Events (name, description, startdate, enddate, location, orgid) VALUES ($1, $2, $3, $4, $5, $6);',
		values: [name, description, startdate, enddate, location, orgid],
	}

	
	try {
		const res = (await pool.query(query));
		return new Response(JSON.stringify({ success: true}));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false }))
	}
	
}) satisfies RequestHandler;
