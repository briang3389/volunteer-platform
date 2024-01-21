<script>
	import { goto } from '$app/navigation';
	import TopBar from '$lib/TopBar.svelte';
	import { getLoginData } from '$lib/client_get_loggin_data';

	export let data;

	const loginData = getLoginData(data.token);

	function navigateToSearch() {
		goto('/search/keyword/%20');
	}
</script>

<div class="landing min-h-screen bg-gray-100 flex flex-col">
	<TopBar token={data.token} />
	<div class="flex-grow flex items-center justify-center p-4">
		<div class="text-center">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Helping Communities, One Hour at a Time</h2>
			<img
				class="block mx-auto max-w-lg h-auto rounded-lg shadow-md mb-4"
				src="https://students.1fbusa.com/hubfs/25%20Ways%20to%20Volunteer%20in%20Your%20Community.jpg"
				alt="Volunteers"
			/>
			{#if loginData?.type === 'org'}
				<button
					class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
					on:click={() => goto('/create-event')}
				>
					Set up an Event in Your Area
				</button>
				<button
					class="bg-blue-600 hover:bg-blue-800 text-white font-bold ml-2 py-2 px-6 rounded"
					on:click={() => goto('/verifyhours')}
				>
					Verify Hours
				</button>
			{:else}
				<button
					class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
					on:click={navigateToSearch}
				>
					Find out What's Going in Your Area
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.landing {
		background-color: #74EBD5;
		background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
	}
</style>
