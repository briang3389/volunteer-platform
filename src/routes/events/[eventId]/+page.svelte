<script>
	import TopBar from "$lib/TopBar.svelte";
	import { generateQRCode } from "$lib/qr_gen";

    async function getQrData(url) {
        return generateQRCode(url, 500, 500);
    }

    export let event = {
      name: 'Clean Up Park',
      startDate: '2024-01-20',
      location: 'Sample Location',
      endDate: '2024-01-22',
      description: 'A sample event description.',
      eventIconUrl: '',
    };
  
    // Dummy QR code data, replace with actual data
    let qrArg = "https://example.com";


  </script>


<TopBar/>

<div class="container mx-auto p-4">
    <div class="name-container flex items-center">
      <!-- Event Image and Name -->
      <div class="mr-4">
        <img class="image object-cover rounded-full" src={event.eventIconUrl} alt={event.name + ' Image'}>
      </div>
      <div>
        <h1 class="name text-3xl font-bold">{event.name}</h1>
      </div>
    </div>
  
    <!-- Event Details on the Left -->
    <div class="flex mt-4">
      <div class="w-1/2 pr-4">
        <p class="text-2xl text"><span class="font-bold">Start Date:</span> {event.startDate}</p>
        <p class="text-2xl text"><span class="font-bold">End Date:</span> {event.endDate}</p>
        <p class="text-2xl text"><span class="font-bold">Location:</span> {event.location}</p>
        <p class="text-2xl text"><span class="font-bold">Description:</span> {event.description}</p>
      </div>
  
      <!-- QR Code on the Right -->
      <div class="w-1/2">
        <div class="flex items-center justify-center">
            {#await getQrData(qrArg)}
                <p>...generating qr code</p>
            {:then { qrCodeData }}
                <img src="{qrCodeData}" id="qrCodeImage" alt="QR Code" class="border qr" />
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
      </div>
    </div>
  </div>

  <style>

    .container {
        width: 50%;
        margin: auto;
    }

    .text {
        padding-top: 3rem;
    }

    .image {
        width: 7rem;
        height: 7rem;
    }

    .name {
        margin-top: 0.5rem;
    }

    .qr {
        width: 25rem;
        height: 25rem;
    }
  </style>