<script lang="ts">
  import TopBar from '$lib/TopBar.svelte';
  import { userSession } from '$lib/sessionStore';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import {load_user} from '$lib/load_user';

  let username = '';
  let eventHours = '';
  const handleSubmit = async () => {
    const eventid = $page.url.searchParams.get('eventid');
    const orgid = $page.url.searchParams.get('orgid');
    const userid = await load_user();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const res = await fetch("/api/insert/eventlog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventid,
                    orgid,
                    userid,
                    eventHours,
                    date: formattedDate

                })
        });
        return {
            status: await res.status,
            body: await res.json()
        };
  };
</script>

<TopBar username={username} />

<div class="container mx-auto p-4">
  <div class="w-full max-w-xs mx-auto">
    <h1 class="text-xl font-semibold mb-4">Claim hours below:</h1>
    <div></div>
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
