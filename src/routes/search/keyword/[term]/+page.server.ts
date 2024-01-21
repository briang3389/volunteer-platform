import { searchEvent } from '$lib/search.js';

export async function load({ params }) {
	return {
		initialSearchTerm: params.term,
		initialSearchResults: await searchEvent(params.term)
	};
}
