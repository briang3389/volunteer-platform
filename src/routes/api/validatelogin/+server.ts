import type { RequestHandler } from "@sveltejs/kit";
import { getLoggedInId, getLoggedInOrgid } from "$lib";


export const POST = (async ({ request, cookies }) => {
    try{ 
        getLoggedInId(cookies);
        return new Response(JSON.stringify({success: true}));
    }
    catch (e) {
        try {
            getLoggedInOrgid(cookies);
        }
        catch (e) {
            return new Response(JSON.stringify({success: false}));
        }
        return new Response(JSON.stringify({success: true}));
    }
}) satisfies RequestHandler;