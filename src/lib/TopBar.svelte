<script>
  import { goto } from '$app/navigation';
  export let username = '';
</script>

<nav class="bg-white shadow-md">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-3">
      <div class="flex-shrink-0">
        <h1 class="text-2xl font-bold text-gray-900">Volunteer.io</h1>
      </div>
      <div>
        {#if username}
          <span class="text-gray-800 text-sm font-semibold">Welcome back, {username}!</span>
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