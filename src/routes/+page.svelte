<script>
  import { goto } from '$app/navigation';
  import { userSession } from '$lib/sessionStore';
  import { onDestroy } from 'svelte';

  let username = '';
  const unsubscribe = userSession.subscribe($userSession => {
    username = $userSession ? $userSession.username : '';
  });

  onDestroy(() => {
    unsubscribe();
  });

  function navigateToSearch() {
    goto('/search'); // Replace '/search' with the actual path for location search
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold text-gray-900">Volunteer.io</h1>
    <p class="text-xl text-gray-700">Helping Communities, One Hour at a Time</p>
    <div class="mt-4">
      <input class="shadow appearance-none border rounded w-full max-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search..." />
    </div>
  </div>

  <div class="mb-4">
    <!-- Replace with your image path -->
    <img class="rounded-lg shadow-md" src="/path/to/your/cool-picture.jpg" alt="Cool Picture">
  </div>

  {#if username}
    <p class="mb-4">Welcome back, {username}!</p>
  {:else}
    <div class="space-x-4 mb-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => goto('/login')}>Log In</button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={() => goto('/signup')}>Sign Up</button>
    </div>
  {/if}

  <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded" on:click={navigateToSearch}>
    Find out What's Going in Your Area
  </button>
</div>

<style>
  /* Add your CSS styling here, if needed */
</style>
