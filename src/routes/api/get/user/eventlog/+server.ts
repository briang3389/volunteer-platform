import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request } ) => {
	const pool: pg.Pool= await getDb();
	let { userid } = await request.json();
	const query = {
		name: 'get-user-eventlog',
		text: 'SELECT eventid, orgid, hours, verified, date FROM EventLog INNER JOIN Users ON Users.userid = EventLog.userid WHERE Users.userid = $1;',
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
