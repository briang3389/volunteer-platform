<script>
  import TopBar from '$lib/TopBar.svelte';
import { onMount } from 'svelte';

  //let volunteers = [{name: "John Doe", claimedHours: 10}, {name: "Jane Doe", claimedHours: 5}];
  let volunteers = [];

  export let data;


  onMount(async () => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/get/volunteer-claims');
    if (response.ok) {
      volunteers = await response.json();
    }
  });

  async function handleAccept(volunteerId) {
    // Implement the logic to accept the hours
    // Send request to backend
  }

  async function handleDecline(volunteerId) {
    // Implement the logic to decline the hours
    // Send request to backend
  }
</script>

<TopBar token={data.token} />

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Verify Volunteer Hours</h1>
  <div class="overflow-x-auto">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Volunteer Name
          </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Claimed Hours
          </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
        </tr>
      </thead>
      <tbody>
        {#each volunteers as volunteer}
          <tr>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {volunteer.name}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {volunteer.claimedHours}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex">
              <button class="text-white bg-green-500 hover:bg-green-700 rounded py-1 px-3 mr-2" on:click={() => handleAccept(volunteer.id)}>
                Accept
              </button>
              <button class="text-white bg-red-500 hover:bg-red-700 rounded py-1 px-3" on:click={() => handleDecline(volunteer.id)}>
                Decline
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* Add any additional styling here */
</style>
