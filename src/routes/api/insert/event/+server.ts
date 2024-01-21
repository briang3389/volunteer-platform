import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { apiError, apiOkData, getDb } from '$lib/index'
import pg from 'pg';
import { getLoggedInOrgid } from '$lib/index';

export const POST = (async ({ request, cookies } ) => {
	const pool: pg.Pool= await getDb();
	let { name, description, startdate, enddate, location, icon_url } = await request.json();
	let orgid: Number | null  = getLoggedInOrgid(cookies);
	if (orgid == null) {
		return new Response(JSON.stringify({ success: false}))
	}
	const query = {
		name: 'insert-event',
		text: 'INSERT INTO Events (name, description, startdate, enddate, location, orgid, icon_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING eventid;',
		values: [name, description, startdate, enddate, location, orgid, icon_url],
	}

	
	try {
		const res = (await pool.query(query));
		if (res.rowCount == 1) {
			return apiOkData({ id: res.rows[0].eventid });
		} else {
			return apiError();
		}
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false }))
	}
	
}) satisfies RequestHandler;
