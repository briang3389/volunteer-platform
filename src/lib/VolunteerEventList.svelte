<script lang="ts">
	import { page } from "$app/stores";
	import { error } from "@sveltejs/kit";

    export let userid: number;

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
                console.log(data);
                return { events: {data: [{name: 'No events', description: 'This user has not attended any events', startdate: '', enddate: '', location: '', icon_url: ''}]} };
            }
            let totalHours = 0;
            let totalEvents = 0;
            for (let i = 0; i < data.data.length; i++) {
                totalHours += data.data[i].hours;
                totalEvents++;
            }
            const eventdata = await fetch('/api/get/event/eventbyid', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ eventid: data.data[0].eventid })
            });
            const data2 = await eventdata.json();

            return { events: data2, eventid: data.data[0].eventid, totalHours, totalEvents };
        } else {
            throw new Error("Error fetching events");
        }
    }

</script>
{#await getEvents()}
<div class="events-container">
    <p>...waiting</p>
</div>
{:then   { events, eventid, totalHours, totalEvents }  }

  <div class="totals-container">
    <div class="totals">
        <p>Total Hours Volunteered: {totalHours}</p>
        <p>Total Events Attended: {totalEvents}</p>
    </div>
  </div>
        {#if events.data.length !== 0}
            {#each events.data as { name, description, startdate, enddate, location, icon_url } }
            <div class="event-container">
                <img src={icon_url} alt="" class="event-icon">
                <div class="event-block">
                <h2 class="text-2xl font-bold">{name}</h2>
                <p class="text-lg">{description}</p>
                <p class="text-lg">Dates: {startdate} - {enddate}</p>
                <p class="text-lg">{location}</p>
                <a href="../events/{eventid}" class="text-blue-500 underline">Event Page</a>
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
.events-container {
    width: 100%;
}

.event-container {
    display: grid;
    padding-bottom: 1rem;
  }

  .event-block {
    border: 0.4rem solid #999;
    border-radius: 10%;
    padding: 10px;
    text-align: center;
  }
</style>