<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getLoginData } from '$lib/client_get_loggin_data';

	let isLoggedIn = false;
	let userProfileUrl = '';
	export let logoUrl = '/logo.png';
	export let token;
	let searchQuery = '';
	let theName = 'Dude';

	async function handleLogout() {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				}
			});
			isLoggedIn = false;
		} catch (error) {
			console.error('Failed to validate login:', error);
		}
		window.location = '/';
	}

	function handleSearchSubmit() {
		const encodedQuery = encodeURIComponent(searchQuery);
		if (encodedQuery == '') {
			return;
		}
		goto(`/search/keyword/${encodedQuery}`);
	}

	async function fetchUserProfile() {
		const loginData = getLoginData(token);

		if (loginData?.type === 'user') {
			try {
				const response = await fetch('/api/get/user/userbyid', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				});
				const result = await response.json();
				userProfileUrl = `/volunteers/${result.data[0].username}`;
				theName = result.data[0].name;
				return;
			} catch (error) {}
		} else if (loginData?.type === 'org') {
			try {
				const response = await fetch('/api/get/org/orgbyid', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				});
				const result = await response.json();
				userProfileUrl = `/orgs/${result.data[0].name}`;
				theName = result.data[0].name;
				return;
			} catch (error) {
				console.error('Failed to fetch user/org profile:', error);
			}
		}
	}

	onMount(async () => {
		try {
			const response = await fetch('/api/validatelogin', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				}
			});
			const result = await response.json();
			isLoggedIn = result.success;
			if (isLoggedIn) {
				await fetchUserProfile();
			}
		} catch (error) {
			console.error('Failed to validate login:', error);
		}
	});
</script>

<nav class="bg-white shadow-md">
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between items-center py-3">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex items-center flex-shrink-0 cursor-pointer" on:click={() => goto('/')}>
				<img src={logoUrl} alt="Volunteer Me Logo" class="h-8 w-8 mr-2" />
				<h1 class="text-2xl font-bold text-gray-900">Volunteer Me</h1>
			</div>

			<div class="flex-grow flex justify-center items-center">
				<input
					style="border-right-color: transparent"
					type="text"
					class="border rounded-l py-2 px-4"
					placeholder="Search..."
					bind:value={searchQuery}
					on:keydown={(e) => e.key === 'Enter' && handleSearchSubmit()}
				/>
				<button
					style="height: 42px"
					class="border rounded-r bg-blue-500 hover:bg-blue-700 text-white py-2 px-3"
					on:click={handleSearchSubmit}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						class="w-4 h-4"
					>
						<circle cx="11" cy="11" r="6"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
				</button>
			</div>

			<div class="flex items-center flex-shrink-0">
				{#if isLoggedIn}
					<span class="text-gray-800 text-sm font-semibold mr-4">Welcome back, {theName}!</span>
					<button
						class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
						on:click={() => (window.location = userProfileUrl)}
					>
						My Profile
					</button>
					<button
						class="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium"
						on:click={handleLogout}
					>
						Log Out
					</button>
				{:else}
					<button
						class="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
						on:click={() => goto('/login')}
					>
						Log In
					</button>
					<button
						class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
						on:click={() => goto('/signup')}
					>
						Sign Up
					</button>
				{/if}
			</div>
		</div>
	</div>
</nav>
