import type { RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

export const POST = (async ({ request }) => {
    // FIXME: handle error of invalid json
    const data = await request.json();


    return new Response();
}) satisfies RequestHandler;