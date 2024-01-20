
<script>
  import { goto } from '$app/navigation';
  import { userSession } from '$lib/sessionStore';
  import { onDestroy } from 'svelte';

  let username = '';
  const unsubscribe = userSession.subscribe($userSession => {
    username = $userSession ? $userSession.username : '';
  });

  onDestroy(() => {
    unsubscribe(); // Unsubscribe when the component is destroyed
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold text-center mb-4">Welcome to Our Volunteer Tracking Platform</h1>
  {#if username}
    <p class="text-center">Welcome back, {username}!</p>
  {:else}
    <div class="flex justify-center space-x-4 mt-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => goto('/login')}>Log In</button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={() => goto('/signup')}>Sign Up</button>
    </div>
  {/if}
</div>

<style>
  /* Add your CSS styling here */
</style>
