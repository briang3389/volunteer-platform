import { getDb } from '$lib';

export interface Event {
	name: string;
	description: string;
	startdate: string;
	enddate: string;
	location: string;
	orgid: string;
	icon_url: string;
}

export async function getEvent(eventid: number): Promise<Event | null> {
	const db = await getDb();
	const query = {
		name: 'get-event',
		text: 'SELECT name, description, startdate, enddate, location, orgid, icon_url FROM Events WHERE eventid = $1;',
		values: [eventid]
	};

	try {
		const res = (await db.query(query)).rows;
		if (res.length == 1) {
			return res[0];
		}
	} catch (e) {
		return null;
	}

	return null;
}
