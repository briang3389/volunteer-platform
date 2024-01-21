<script>
	import TopBar from "$lib/TopBar.svelte";
  import { goto } from '$app/navigation';

  export let data;

    let eventName = '';
    let startDate = '';
    let location = '';
    let endDate = '';
    let description = '';
    let eventIconUrl = 'https://static.wixstatic.com/media/6296ce_663f07a068f840109737ad0fbebccd73~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/6296ce_663f07a068f840109737ad0fbebccd73~mv2.jpg';

    let error = false;
  
    async function handleSubmit() {
      const response = await fetch("/api/insert/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          description: description,
          startdate: startDate,
          enddate: endDate,
          location: location,
          icon_url: eventIconUrl,
        }),
      });
      const result = await response.json();

      if (result.success) {
        goto(`/events/${result.data.id}`);
      } else {
        error = true;
      }
    }
  </script>

<TopBar token={data.token}/>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 title">Create Event</h1>
  
    <form on:submit|preventDefault={handleSubmit}>
      <label class="block mb-2" for="eventName">Event Name:</label>
      <input class="border rounded w-full p-2" type="text" bind:value={eventName} required>
  
      <label class="block mt-4 mb-2" for="startDate">Start Date:</label>
      <input class="border rounded w-full p-2" type="date" bind:value={startDate} required>
  
      <label class="block mt-4 mb-2" for="location">Location:</label>
      <input class="border rounded w-full p-2" type="text" bind:value={location} required>
  
      <label class="block mt-4 mb-2" for="endDate">End Date:</label>
      <input class="border rounded w-full p-2" type="date" bind:value={endDate} required>
  
      <label class="block mt-4 mb-2" for="description">Description:</label>
      <textarea class="border rounded w-full p-2" bind:value={description} rows="4" required></textarea>
  
      <label class="block mt-4 mb-2" for="eventIconUrl">Event Icon URL:</label>
      <input class="border rounded w-full p-2" type="url" bind:value={eventIconUrl} required>
      <br>
      <button class="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700" type="submit">Create Event</button>
    </form>

    {#if error}
      <div class="w-full py-4 flex place-content-center">
        <p class="text-red-600">Could not create event</p>
      </div>
    {/if}
  </div>

  <style>
    .container {
        width: 50%;
        margin:auto;
    }

    .title {
        font-size: 2rem;
    }

    input, textarea {
        border: 0.1rem solid black;
        padding: 0.1rem;
        width: 40rem;
    }

    label {
        font-weight: bold;
    }

    button {
        border: 0.05rem solid black;
    }
  </style>