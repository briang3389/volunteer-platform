import { PG_USER, PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, JWT_SECRET } from '$env/static/private';
import pg from "pg";
import { error, type Cookies } from '@sveltejs/kit';
import * as argon2 from "argon2";
import { randomBytes } from 'crypto';
import jwt from "jsonwebtoken";

export const TOKEN_COOKIE_NAME = "token";

// 3 hours in seconds
const JWT_AGE = 60 * 60 * 3;

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

export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
}

export async function verifyPassword(hashedPassword: string, checkPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, checkPassword);
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

export function setLoggedInCokie(cookies: Cookies, userid: Number, userType: AccountType) {
    let data;
    if (userType === "user") {
        data = { userid: userid };
    } else {
        data = { orgid: userid };
    }

    const token = jwt.sign(
        data,
        JWT_SECRET,
        { expiresIn: JWT_AGE },
    );

    cookies.set(TOKEN_COOKIE_NAME, token, {
        maxAge: JWT_AGE,
        path: "/",
        sameSite: true,
        httpOnly: false,
    });
}

export function apiOk(): Response {
    return new Response(JSON.stringify({success: true}));
}

export function apiError(): Response {
    return new Response(JSON.stringify({success: false}));
}

export type AccountType = "user" | "org";