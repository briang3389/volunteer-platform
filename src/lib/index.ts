import { PG_USER, PG_DB, PG_HOST, PG_PASSWORD, PG_PORT } from '$env/static/private';
import { Pool } from "pg";
import { error } from '@sveltejs/kit';

// place files you want to import through the `$lib` alias in this folder.

let db: Pool | null = null;

async function getDb(): Promise<Pool> {
    if (db == null) {
        const newDb = new Pool({
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