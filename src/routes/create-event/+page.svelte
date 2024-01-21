<script>
	import TopBar from "$lib/TopBar.svelte";

    let eventName = '';
    let startDate = '';
    let location = '';
    let endDate = '';
    let description = '';
    let eventIconUrl = '';
  
    function handleSubmit() {
      // You can handle the form submission logic here
      console.log('Form submitted:', { eventName, startDate, location, endDate, description, eventIconUrl });
    }
  </script>

<TopBar/>

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