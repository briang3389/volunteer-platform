<script>
  import TopBar from '$lib/TopBar.svelte';
  import { userSession } from '$lib/sessionStore';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';

  let username = '';
  let eventHours = '';
  const event = "Big Event"; // This should be dynamic based on your app's state or routing

  // Subscribe to userSession store
  const unsubscribe = userSession.subscribe($userSession => {
    username = $userSession ? $userSession.username : '';
  });

  onDestroy(() => {
    unsubscribe();
  });

  const handleSubmit = async () => {
    // Logic to handle submission of hours
    // You would typically send this data to your backend API
  };
</script>

<TopBar username={username} />

<div class="container mx-auto p-4">
  <div class="w-full max-w-xs mx-auto">
    <h1 class="text-xl font-semibold mb-4">You are claiming hours for {event}</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-4">
        <label for="hours" class="block text-gray-700 text-sm font-bold mb-2">
          Number of Hours:
        </label>
        <input id="hours" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="number" bind:value={eventHours} placeholder="e.g., 5" />
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Claim
      </button>
    </form>
  </div>
</div>

<style>
  /* Add any additional styling here */
</style>
