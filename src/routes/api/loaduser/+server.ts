import type { RequestHandler } from "@sveltejs/kit";
import { apiError, getLoggedInId } from "$lib";


export const POST = (async ({ request, cookies }) => {
    // FIXME: handle error of invalid json
    let token = getLoggedInId(cookies);
    if (token === null) {
        return apiError();
    }
    return new Response(JSON.stringify({ success: true, token: token }));
}) satisfies RequestHandler;