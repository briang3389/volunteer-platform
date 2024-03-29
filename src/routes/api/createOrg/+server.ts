import { apiError, apiOk, getDb, hashPassword, setLoggedInCokie } from '$lib';
import type { CreateOrgOptions } from '$lib/login';
import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request, cookies }) => {
	const data: CreateOrgOptions = await request.json();

	if (
		data.name == null ||
		data.password == null ||
		data.profilePicUrl == null ||
		data.description == null
	) {
		return apiError();
	}

	const db = await getDb();

	const query = {
		text: 'INSERT INTO Organizations (name, password, description, icon_url) VALUES ($1, $2, $3, $4) RETURNING Organizations.orgid',
		values: [data.name, await hashPassword(data.password), data.description, data.profilePicUrl]
	};

	let result;
	try {
		result = await db.query(query);
	} catch (e) {
		return apiError();
	}

	if (result.rowCount == 0) {
		return apiError();
	}

	const orgId = result.rows[0].orgid;
	setLoggedInCokie(cookies, orgId, 'org');

	return apiOk();
}) satisfies RequestHandler;
