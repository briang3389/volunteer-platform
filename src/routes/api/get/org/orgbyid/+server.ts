import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/index';
import pg from 'pg';
import { getLoggedInOrgid } from '$lib/index';

export const POST = (async ({ request, cookies }) => {
	const pool: pg.Pool = await getDb();
	let orgid = getLoggedInOrgid(cookies);
	const query = {
		name: 'get-org-by-id',
		text: 'SELECT orgid, name, icon_url, description FROM organizations WHERE orgid = $1;',
		values: [orgid]
	};

	try {
		const res = await (await pool.query(query)).rows;
		return new Response(JSON.stringify({ success: true, data: res }));
	} catch (e) {
		return new Response(JSON.stringify({ success: false, data: [] }));
	}
}) satisfies RequestHandler;
