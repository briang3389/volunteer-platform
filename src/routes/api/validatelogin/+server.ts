import type { RequestHandler } from "@sveltejs/kit";
import { getLoggedInId, checkCookieExists } from "$lib";


export const POST = (async ({ request, cookies }) => {
    return new Response(JSON.stringify({success: checkCookieExists(cookies)}));
}) satisfies RequestHandler;