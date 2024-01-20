import { apiError, apiOk, getDb, hashPassword, setLoggedInCokie } from "$lib";
import type { CreateOrgOptions } from "$lib/login";
import type { RequestHandler } from "@sveltejs/kit";

export const POST = (async ({ request, cookies }) => {
    const data: CreateOrgOptions = await request.json();

    if (data.name == null || data.password == null) {
        return apiError();
    }

    const db = await getDb();

    const query = {
        text: "INSERT INTO Organizations (name, password, description) VALUES ($1, $2, '') RETURNING Organizations.orgid",
        values: [data.name, await hashPassword(data.password)],
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

    const orgId = result.rows[0].orgid;
    setLoggedInCokie(cookies, orgId, "org");

    return apiOk();
}) satisfies RequestHandler;