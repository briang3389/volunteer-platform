import { PG_USER, PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, JWT_SECRET } from '$env/static/private';
import pg from "pg";
import { error, type Cookies } from '@sveltejs/kit';
import * as argon2 from "argon2";
import { randomBytes } from 'crypto';
import jwt from "jsonwebtoken";

export const TOKEN_COOKIE_NAME = "token";

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

export function getLoggedInId(cookies: Cookies): Number | null {
    const cookie = cookies.get(TOKEN_COOKIE_NAME);
    if (cookie === undefined) {
        return null;
    } else {
        const tokenData = jwt.verify(cookie, JWT_SECRET) as any;
        const userid = tokenData["userid"] as string | undefined;
        if (userid == null) {
            return null;
        } else {
            return Number(userid);
        }
    }
}

export function getLoggedInOrgid(cookies: Cookies): Number | null {
    const cookie = cookies.get(TOKEN_COOKIE_NAME);
    if (cookie === undefined) {
        return null;
    } else {
        const tokenData = jwt.verify(cookie, JWT_SECRET) as any;
        const userid = tokenData["orgid"] as string | undefined;
        if (userid == null) {
            return null;
        } else {
            return Number(userid);
        }
    }
}