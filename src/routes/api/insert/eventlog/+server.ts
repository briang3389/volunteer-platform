import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb, getLoggedInId } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { eventid, userid, orgid, eventHours, date } = await request.json();
	const query = {
		name: 'insert-eventlog',
		text: 'INSERT INTO EventLog (eventid, userid, orgid, hours, verified, date) VALUES ($1, $2, $3, $4, $5, $6);',
		values: [eventid, userid, orgid, eventHours, false, date],
	}

	
	try {
		const res = (await pool.query(query));
		return new Response(JSON.stringify({ success: true}));
	}
	catch (err:unknown) {
		// return new Response(JSON.stringify({ success: false }));
		if (err instanceof Error){
			throw error(500, err.message);
		}
		else {
			throw error(500, "Unknown error");
		}
	}
	
}) satisfies RequestHandler;
