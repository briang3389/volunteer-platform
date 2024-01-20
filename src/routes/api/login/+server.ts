import { getDb, verifyPassword } from "$lib";
import type { RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

export const POST = (async ({ request }) => {
    // FIXME: handle error of invalid json
    const data = await request.json();
    const db = await getDb();

    const query = {
        text: "SELECT password FROM Users WHERE username = $1",
        values: [data.username],
    };
    const rows = (await db.query(query)).rows;

    if (rows.length == 1) {
        const hashedPassword = rows[0].password;
        if (await verifyPassword(hashedPassword, data.password)) {
        }
    }

    return new Response(JSON.stringify({ correct: false }));
}) satisfies RequestHandler;