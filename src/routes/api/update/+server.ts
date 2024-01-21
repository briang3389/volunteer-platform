import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb, getLoggedInOrgid } from '$lib/index';
import pg from 'pg';

export const POST = (async ({ request, cookies }) => {
	const pool: pg.Pool = await getDb();
	let { eventid, userid, verified } = await request.json();
	let orgid: Number | null = getLoggedInOrgid(cookies);
	if (orgid == null) {
		return new Response(JSON.stringify({ success: false, data: [] }));
	}
	let query = null;
	if (verified) {
		query = {
			name: 'update-eventlog',
			text: 'UPDATE EventLog SET verified = TRUE WHERE eventid = $1 and userid = $2 AND orgid = $3 AND verified = FALSE;',
			values: [eventid, userid, orgid]
		};
	} else {
		query = {
			name: 'update-eventlog',
			text: 'DELETE FROM EventLog WHERE eventid = $1 and userid = $2 AND orgid = $3 AND verified = FALSE;',
			values: [eventid, userid, orgid]
		};
	}
	try {
		const res = await pool.query(query);
		return new Response(JSON.stringify({ success: true }));
	} catch (e) {
		return new Response(JSON.stringify({ success: false }));
	}
}) satisfies RequestHandler;
