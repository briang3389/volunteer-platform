<!-- src/routes/index.svelte -->
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

<div class="landing-container">
  <h1>Welcome to Our Volunteer Tracking Platform</h1>
  {#if username}
    <p>Welcome back, {username}!</p>
  {:else}
    <div class="buttons-container">
      <button on:click={() => goto('/login')}>Log In</button>
      <button on:click={() => goto('/signup')}>Sign Up</button>
    </div>
  {/if}
</div>

<style>
  /* Add your CSS styling here */
</style>
