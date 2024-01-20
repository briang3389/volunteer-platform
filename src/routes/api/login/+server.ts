import { JWT_SECRET } from "$env/static/private";
import { TOKEN_COOKIE_NAME, getDb, verifyPassword } from "$lib";
import type { RequestHandler } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

// 3 hours in seconds
const JWT_AGE = 60 * 60 * 3;

export const POST = (async ({ request, cookies }) => {
    // FIXME: handle error of invalid json
    const data = await request.json();
    const db = await getDb();

    const query = {
        text: "SELECT userid, password FROM Users WHERE username = $1",
        values: [data.username],
    };
    const rows = (await db.query(query)).rows;

    if (rows.length == 1) {
        const userid = rows[0].userid;
        const hashedPassword = rows[0].password;

        if (await verifyPassword(hashedPassword, data.password)) {
            const token = jwt.sign(
                { userid: userid },
                JWT_SECRET,
                { expiresIn: JWT_AGE },
            );

            cookies.set(TOKEN_COOKIE_NAME, token, {
                maxAge: JWT_AGE,
                path: "/",
                sameSite: true,
                httpOnly: false,
            });

            return new Response(JSON.stringify({ correct: true }));
        }
    }

    return new Response(JSON.stringify({ correct: false }));
}) satisfies RequestHandler;