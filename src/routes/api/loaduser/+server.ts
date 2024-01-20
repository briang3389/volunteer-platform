import type { RequestHandler } from "@sveltejs/kit";
import { getLoggedInId } from "$lib";


export const POST = (async ({ request, cookies }) => {
    // FIXME: handle error of invalid json
    let token = getLoggedInId(cookies);
    if (token === null) {
        return Response.redirect("/login");
    }
    return new Response(JSON.stringify({ success: true, token: token }));
}) satisfies RequestHandler;