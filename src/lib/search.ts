import { getDb } from "$lib";

interface SearchArgs {
    idName: string,
    tableName: string,
}

async function search(name: string, args: SearchArgs): Promise<any[]> {
    const db = await getDb();

    const query = {
        text: `SELECT {args.idName}, similarity(name, $1) AS similarity FROM {args.tableName} WHERE name % $1 ORDER BY similarity DESC LIMIT 100`,
        values: [name],
    };
    return (await db.query(query)).rows;
}

export interface UserSearchResult {
    userid: Number,
    name: string,
}

export async function searchUser(name: string): Promise<UserSearchResult[]> {
    return search(name, {
        idName: "userid",
        tableName: "Users",
    });
}

export interface OrgSearchResult {
    userid: Number,
    name: string,
}

export async function searchOrg(name: string): Promise<OrgSearchResult[]> {
    return search(name, {
        idName: "orgid",
        tableName: "Organizations",
    });
}

export interface EventSearchResult {
    eventid: Number,
    name: string,
}

export async function searchEvent(name: string): Promise<EventSearchResult[]> {
    return search(name, {
        idName: "eventid",
        tableName: "Events",
    });
}