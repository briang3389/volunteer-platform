// returns true if login succeeded
export async function loginUser(username: String, password: String): Promise<boolean> {
	const result = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	});
	const body = await result.json();

	return body.success;
}

export interface CreateUserOptions {
	name: string;
	email: string;
	username: string;
	password: string;
	profilePicUrl: string;
}

export async function createUser(options: CreateUserOptions): Promise<Boolean> {
	const result = await fetch('/api/createUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(options)
	});
	const body = await result.json();

	return body.success;
}

export interface CreateOrgOptions {
	name: string;
	password: string;
	description: string;
	profilePicUrl: string;
}

export async function createOrg(options: CreateOrgOptions): Promise<Boolean> {
	const result = await fetch('/api/createOrg', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(options)
	});
	const body = await result.json();

	return body.success;
}
