import { PG_USER, PG_DB, PG_HOST, PG_PASSWORD, PG_PORT } from '$env/static/private';
import pg from "pg";
import { error } from '@sveltejs/kit';
// place files you want to import through the `$lib` alias in this folder.

let db: pg.Pool | null = null;

export async function getDb(): Promise<pg.Pool> {
    if (db == null) {
        const newDb = new pg.Pool({
            user: PG_USER,
            database: PG_DB,
            host: PG_HOST,
            password: PG_PASSWORD,
            port: Number(PG_PORT),
        });

        try {
            await newDb.connect();
        } catch (e) {
            throw error(500, "could not connect to database");
        }

        db = newDb;
    }

    return db;
}