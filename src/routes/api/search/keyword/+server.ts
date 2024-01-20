import { apiOkData, apiError } from "$lib";
import { searchUser, searchOrg, searchEvent } from "$lib/search";
import type { RequestHandler } from "@sveltejs/kit";

interface KeywordSearchArgs {
    type: "user" | "org" | "event",
    name: string,
}

export const POST = (async ({ request }) => {
    const data = await request.json();
    if ((data.type != "user" && data.type != "org" && data.type != "event") || data.name == null) {
        return apiError();
    }

    const args: KeywordSearchArgs = data;
    if (args.type == "user") {
        return apiOkData(await searchUser(args.name));
    } else if (args.type == "org") {
        return apiOkData(await searchOrg(args.name));
    } else {
        return apiOkData(await searchEvent(args.name));
    }
}) satisfies RequestHandler;