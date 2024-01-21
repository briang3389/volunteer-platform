<script lang="ts">
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";
	import type { list } from "postcss";
	import type { List } from "postcss/lib/list";

    export let userid: number;

    function getReadableDate(isoString: string) {
        let date = new Date(isoString);
        return date.toDateString() + " " + date.toLocaleTimeString("en-US");
    }

    async function getEvents() {
        const response = await fetch('/api/get/user/eventlog/byid', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ userid: userid })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.data.length === 0) {
                return { events: [{data: [{name: 'No events', description: 'This user has not attended any events', startdate: '', enddate: '', location: '', icon_url: ''}]}] };
            }
            let totalHours = 0;
            let totalEvents = 0;
            let events = [];
            for (let i = 0; i < data.data.length; i++) {
                totalHours += data.data[i].hours;
                totalEvents++;
                const eventdata = await fetch('/api/get/event/eventbyid', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ eventid: data.data[0].eventid })
                });
                events[i] = (await eventdata.json());
            }
            return { events: events, totalHours, totalEvents };
        } else {
            throw new Error("Error fetching events");
        }
    }

</script>
{#await getEvents()}
<div class="events-container">
    <p>...waiting</p>
</div>
{:then   { events, totalHours, totalEvents }  }

  <div class="totals-container">
    <div class="totals">
        <p>Total Hours Volunteered: {totalHours ? totalHours: 0}</p>
        <p>Total Events Attended: {totalEvents ? totalEvents : 0}</p>
    </div>
  </div>
        {#if events.length !== 0}
            {#each events as data }
            <div class="event-container">
                <img src={data.data[0].icon_url} alt="" class="event-icon">
                <div class="event-block">
                    <div class="flex items-center"> <!-- Added flex container for alignment -->
                    <img src="{data.data[0].icon_url}" alt="{data.data[0].name} Image" class="event-picture mr-4 object-cover rounded-full"> <!-- Adjust the image size as needed -->
                        <div>
                            <h2 class="text-2xl font-bold">{data.data[0].name}</h2>
                            <p class="text-lg">{data.data[0].description}</p>
                            <p class="text-lg">Start Date: {getReadableDate(data.data[0].startdate)}</p>
                            <p class="text-lg">End Date: {getReadableDate(data.data[0].enddate)}</p>
                            <p class="text-lg">{data.data[0].location}</p>
                            <a href="../events/{data.data[0].eventid}" class="text-blue-500 underline">Event Page</a>
                        </div>
                    </div>
                </div>
            </div>
            {/each}
        {:else}
            <p>No events found</p>
        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
  
{/await}



<style>
.event-picture {
    width: 7rem;
    height: 7rem;
}

.event-container {
    display: grid;
    margin-bottom: 1rem;
    width: 50rem;
    border: 0.4rem solid #999;
    border-radius: 1rem;
  }

  .event-block {
    padding: 10px;
    width: 35%;
    margin: auto;
    text-align: center;
    width: max-content;
  }

  .totals {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .totals-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>