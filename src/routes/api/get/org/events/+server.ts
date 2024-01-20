import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb, getLoggedInOrgid } from '$lib/index'
import pg from 'pg';

export const POST = (async ({ request, cookies } ) => {
	const pool: pg.Pool= await getDb();
	let { name } = await request.json();
	const query = {
		name: 'get-org-events',
		text: 'SELECT description, startdate, enddate, location, icon_url FROM Events INNER JOIN Organizations ON Events.orgid = Organizations.orgid WHERE Organizations.name = $1;',
		values: [name],
	}

	
	try {
		const res = await (await pool.query(query)).rows;
		return new Response(JSON.stringify({ success: true, data: res}));
	}
	catch (e) {
		return new Response(JSON.stringify({ success: false, data: []}))
	}
	
}) satisfies RequestHandler;
