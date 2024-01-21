<script>
  import TopBar from '$lib/TopBar.svelte';
import { onMount } from 'svelte';

  let volunteers = [];
  export let data;
  async function fetchVolunteers() {
    try {
      const response = await fetch('/api/get/org/eventlog2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          volunteers = data.data.filter(vol => !vol.verified).map(vol => ({
            id: vol.userid, 
            name: vol.name,
            claimedHours: vol.hours,
            eventid: vol.eventid
          }));
        }
      } else {
        console.error('Error fetching volunteer data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
    }
  };

  async function updateVolunteerStatus(eventid, volunteerId, isAccepted) {
    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventid: eventid,
          userid: volunteerId,
          verified: isAccepted
        })
      });

      if (response.ok) {
        await fetchVolunteers();
      } else {
        console.error('Error updating volunteer status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating volunteer status:', error);
    }
  }

  onMount(async () => {
    await fetchVolunteers();
  });

  function handleAccept(eventid, volunteerId) {
    updateVolunteerStatus(eventid, volunteerId, true);
  }

  function handleDecline(eventid, volunteerId) {
    updateVolunteerStatus(eventid, volunteerId, false);
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
              <button class="text-white bg-green-500 hover:bg-green-700 rounded py-1 px-3 mr-2" on:click={() => handleAccept(volunteer.eventid, volunteer.id)}>
                Accept
              </button>
              <button class="text-white bg-red-500 hover:bg-red-700 rounded py-1 px-3" on:click={() => handleDecline(volunteer.eventid, volunteer.id)}>
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
