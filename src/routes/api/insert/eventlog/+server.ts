import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { eventid, userid, orgid, hours, verified, date } = await request.json();
	const query = {
		name: 'insert-eventlog',
		text: 'INSERT INTO EventLog (eventid, userid, orgid, hours, verified, date) VALUES ($1, $2, $3, $4, $5, $6);',
		values: [eventid, userid, orgid, hours, verified, date],
	}

	
	try {
		const res = (await pool.query(query));
		return new Response(JSON.stringify({ success: true}));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false }))
	}
	
}) satisfies RequestHandler;
