import { getDb } from '$lib';

interface SearchArgs {
	idName: string;
	userNameColumn: string;
	tableName: string;
}

async function search(name: string, args: SearchArgs): Promise<any[]> {
	const db = await getDb();

	const query = {
		text: `SELECT ${args.idName}, name, ${args.userNameColumn}, word_similarity(name, $1) AS similarity FROM ${args.tableName} ORDER BY similarity DESC LIMIT 100`,
		values: [name]
	};
	return (await db.query(query)).rows;
}

export interface SearchResult {
	id: Number;
	name: string;
	username: string;
}

export async function searchUser(name: string): Promise<SearchResult[]> {
	return (
		await search(name, {
			idName: 'userid',
			userNameColumn: 'username',
			tableName: 'Users'
		})
	).map((user) => {
		return {
			id: user.userid,
			name: user.name,
			username: user.username
		};
	});
}

export async function searchOrg(name: string): Promise<SearchResult[]> {
	return (
		await search(name, {
			idName: 'orgid',
			userNameColumn: 'name',
			tableName: 'Organizations'
		})
	).map((org) => {
		return {
			id: org.orgid,
			name: org.name,
			username: org.username
		};
	});
}

export async function searchEvent(name: string): Promise<SearchResult[]> {
	return (
		await search(name, {
			idName: 'eventid',
			userNameColumn: 'name',
			tableName: 'Events'
		})
	).map((event) => {
		return {
			id: event.eventid,
			name: event.name,
			username: event.username
		};
	});
}
