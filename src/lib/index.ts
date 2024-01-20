import { PG_USER, PG_DB, PG_HOST, PG_PASSWORD, PG_PORT } from '$env/static/private';
import { Pool } from "pg";
import { error } from '@sveltejs/kit';
import * as argon2 from "argon2";
import { randomBytes } from 'crypto';

// place files you want to import through the `$lib` alias in this folder.

let db: Pool | null = null;

export async function getDb(): Promise<Pool> {
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

const SALT_BYTE_LEN = 16;

export async function hashPassword(password: String): Promise<String> {
    const salt = randomBytes(SALT_BYTE_LEN).toString("hex");
    const hash = await argon2.hash(salt + password);
    return salt + ":" + hash;
}

export async function verifyPassword(hashedPassword: String, checkPassword: String): Promise<boolean> {
    const [salt, hash] = hashedPassword.split(":");

    const newHash = await argon2.hash(salt + checkPassword);
    return hash == newHash;
}