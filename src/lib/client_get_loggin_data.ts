import type { AccountType } from "$lib";

function clientJwtDecode(token: string): any {
    const parts = token.split(".");

    if (parts.length !== 3) {
        return null;
    }

    return JSON.parse(atob(parts[1]));
}

export interface LoginData {
    id: number,
    type: AccountType,
}

export function getLoginData(token: string | null): LoginData | null {
    if (token == null) {
        return null;
    }
    const data: any = clientJwtDecode(token);
    if (data == null) {
        return null;
    }

    if (data.userid != null) {
        return {
            id: data.userid,
            type: "user",
        };
    } else if (data.orgid != null) {
        return {
            id: data.orgid,
            type: "org",
        };
    } else {
        return null;
    }
}