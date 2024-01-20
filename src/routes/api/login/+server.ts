import { TOKEN_COOKIE_NAME, apiOk, apiError, getDb, verifyPassword, setLoggedInCokie, type AccountType } from "$lib";
import type { RequestHandler } from "@sveltejs/kit";

interface LoginDetails {
    type: AccountType,
    id: Number,
    password: string,
}

async function getLoginDetails(name: string): Promise<LoginDetails | null> {
    const db = await getDb();

    const userQuery = {
        text: "SELECT userid, password FROM Users WHERE username = $1",
        values: [name],
    };
    const userRows = (await db.query(userQuery)).rows;

    if (userRows.length == 1) {
        return {
            type: "user",
            id: userRows[0].userid,
            password: userRows[0].password,
        };
    }

    const orgQuery = {
        text: "SELECT orgid, password FROM Organizations WHERE name = $1",
        values: [name],
    };
    const orgRows = (await db.query(orgQuery)).rows;

    if (orgRows.length == 1) {
        return {
            type: "org",
            id: orgRows[0].orgid,
            password: orgRows[0].password,
        };
    } else {
        return null;
    }
}

export const POST = (async ({ request, cookies }) => {
    // FIXME: handle error of invalid json
    const data = await request.json();
    if (data.username == null || data.password == null) {
        return apiError();
    }
    
    const loginDetails = await getLoginDetails(data.username);
    if (loginDetails == null) {
        return apiError();
    }

    if (await verifyPassword(loginDetails.password, data.password)) {
        setLoggedInCokie(cookies, loginDetails.id, loginDetails.type);
        return apiOk();
    } else {
        return apiError();
    }
}) satisfies RequestHandler;