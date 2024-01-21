<script lang="ts">
	import TopBar from "$lib/TopBar.svelte";
	import { generateQRCode } from "$lib/qr_gen";
  import { getLoginData } from "$lib/client_get_loggin_data";
  import type { Event } from "$lib/get_queries";

  export let data: any;
  const event: Event | null = data.eventData;
  const loginData = getLoginData(data.token);
  const showQrCode = event != null && loginData?.type == "org" && loginData?.id === Number(event.orgid);

  function getReadableDate(isoString: string) {
        let date = new Date(isoString);
        return date.toDateString() + " " + date.toLocaleTimeString("en-US");
  }

  async function getQrData(url: string) {
      return generateQRCode(url, 500, 500);
  }

  // Dummy QR code data, replace with actual data
  let qrArg = `https://localhost:5173/claim/?eventid=${data?.eventid}&orgid=${event?.orgid}`;

  </script>

{#if event == null}
<p>Event not found</p>
{:else}
<TopBar token={data.token}/>

<div class="container mx-auto p-4">
    <div class="name-container flex items-center">
      <!-- Event Image and Name -->
      <div class="mr-4">
        <img class="image object-cover rounded-full" src={event.icon_url} alt={event.name + ' Image'}>
      </div>
      <div>
        <h1 class="name text-3xl font-bold">{event.name}</h1>
      </div>
    </div>
  
    <!-- Event Details on the Left -->
    <div class="flex mt-4">
      <div class="w-1/2 pr-4">
        <p class="text-2xl text"><span class="font-bold">Start Date:</span> {getReadableDate(event.startdate)}</p>
        <p class="text-2xl text"><span class="font-bold">End Date:</span> {getReadableDate(event.enddate)}</p>
        <p class="text-2xl text"><span class="font-bold">Location:</span> {event.location}</p>
        <p class="text-2xl text"><span class="font-bold">Description:</span> {event.description}</p>
      </div>
  
      <!-- only show qr code if logged in as organizer -->
      {#if showQrCode}
      <!-- QR Code on the Right -->
      <div class="w-1/2">
        <div class="flex items-center justify-center">
            {#await getQrData(qrArg)}
                <p>...generating qr code</p>
            {:then qrCodeData}
                <img src="{qrCodeData}" id="qrCodeImage" alt="QR Code" class="border qr" />
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
      </div>
      {/if}
    </div>
  </div>
  {/if}

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