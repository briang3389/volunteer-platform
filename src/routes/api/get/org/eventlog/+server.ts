import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb, getLoggedInOrgid } from '$lib/index';
import pg from 'pg';

export const POST = (async ({ request, cookies }) => {
	const pool: pg.Pool = await getDb();
	let orgid: Number | null = getLoggedInOrgid(cookies);
	if (orgid == null) {
		return new Response(JSON.stringify({ success: false, data: [] }));
	}
	const query = {
		name: 'get-org-eventlog',
		text: 'SELECT eventid, userid, hours, verified, date FROM EventLog INNER JOIN Organizations ON Organizations.orgid = EventLog.orgid WHERE Organizations.orgid = $1;',
		values: [orgid]
	};

	try {
		const res = await (await pool.query(query)).rows;
		return new Response(JSON.stringify({ success: true, data: res }));
	} catch (e) {
		return new Response(JSON.stringify({ success: false, data: [] }));
	}
}) satisfies RequestHandler;
