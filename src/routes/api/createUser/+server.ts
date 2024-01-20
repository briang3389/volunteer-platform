import { apiError, apiOk, getDb, hashPassword, setLoggedInCokie } from "$lib";
import type { CreateUserOptions } from "$lib/login";
import type { RequestHandler } from "@sveltejs/kit";

export const POST = (async ({ request, cookies }) => {
    const data: CreateUserOptions = await request.json();

    if (data.name == null || data.email == null || data.username == null || data.password == null) {
        return apiError();
    }

    const db = await getDb();

    const query = {
        text: "INSERT INTO Users (username, name, email, password, icon_url) VALUES ($1, $2, $3, $4, '') RETURNING Users.userid",
        values: [data.username, data.name, data.email, await hashPassword(data.password)],
    };

    let result;
    try {
        result = await db.query(query);
    } catch (e) {
        return apiError();
    }

    if (result.rowCount == 0) {
        return apiError();
    }

    const userId = result.rows[0].userid;
    setLoggedInCokie(cookies, userId, "user");

    return apiOk();
}) satisfies RequestHandler;