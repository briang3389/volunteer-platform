import { getEvent } from '$lib/get_queries';

export async function load({ params }) {
	const eventid = Number(params.eventId);

	return {
		eventid: eventid,
		eventData: await getEvent(eventid)
	};
}
