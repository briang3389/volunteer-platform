<script>
  import { goto } from '$app/navigation';
  import { userSession } from '$lib/sessionStore';
  import { onDestroy } from 'svelte';
  import TopBar  from '$lib/TopBar.svelte';

  //let username = '';
  //const unsubscribe = userSession.subscribe($userSession => {
  //  username = $userSession ? $userSession.username : '';
  //});

  onDestroy(() => {
    //unsubscribe();
  });

  function navigateToSearch() {
    goto('/search'); // Replace '/search' with the actual path for location search
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
  <TopBar />
  <div class="flex-grow flex items-center justify-center p-4">
    <div class="text-center">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Helping Communities, One Hour at a Time</h2>
      <img class="block mx-auto max-w-md h-auto rounded-lg shadow-md mb-4" src="https://students.1fbusa.com/hubfs/25%20Ways%20to%20Volunteer%20in%20Your%20Community.jpg" alt="Volunteers">
      <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded" on:click={navigateToSearch}>
        Find out What's Going in Your Area
      </button>
    </div>
  </div>
</div>

<style>
  /* Add your CSS styling here, if needed */
</style>
