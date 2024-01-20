
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const sessionid = cookies.get('token');

	return {
    token: sessionid
	};
}