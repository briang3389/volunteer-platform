<script>
	import { loginUser } from '$lib/login';
	import { goto } from '$app/navigation';
	import TopBar from '$lib/TopBar.svelte';
	let username = '';
	let password = '';
	let error = false;
	export let data;

	const handleSubmit = async (event) => {
		try {
			if (await loginUser(username, password)) {
				window.location = '/';
			} else {
				error = true;
			}
		} catch (error) {
			error = true;
		}
	};
</script>

<TopBar token={data.token} />

<form class="w-full max-w-sm mx-auto mt-6" on:submit|preventDefault={handleSubmit}>
	<input
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		type="text"
		bind:value={username}
		placeholder="Username"
	/>
	<input
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
		type="password"
		bind:value={password}
		placeholder="Password"
	/>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
		type="submit">Log In</button
	>
	{#if error}
		<div class="w-full py-4 flex place-content-center">
			<p class="text-red-600">Incorrect Username or Password</p>
		</div>
	{/if}
</form>

<style>
</style>
