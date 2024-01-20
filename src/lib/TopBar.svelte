<script>
  import { goto } from '$app/navigation';
  import { userSession } from '$lib/sessionStore';

  export let username = '';
  export let logoUrl = '/logo.png';

  function handleLogout() {
    // Logic for logging out
    userSession.set(null); // Clear user session
    goto('/'); // Redirect to the homepage after logout
  }
</script>

<nav class="bg-white shadow-md">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-3">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="flex items-center flex-shrink-0 cursor-pointer" on:click={() => goto('/')}>
        <img src={logoUrl} alt="Volunteer.io Logo" class="h-8 w-8 mr-2" /> <!-- Logo image -->
        <h1 class="text-2xl font-bold text-gray-900">Volunteer.io</h1>
      </div>
      <div>
        {#if username}
          <span class="text-gray-800 text-sm font-semibold mr-4">Welcome back, {username}!</span>
          <button class="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium" on:click={handleLogout}>
            Log Out
          </button>
        {:else}
          <button class="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium" on:click={() => goto('/login')}>
            Log In
          </button>
          <button class="text-green-600 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium" on:click={() => goto('/signup')}>
            Sign Up
          </button>
        {/if}
      </div>
    </div>
  </div>
</nav>
