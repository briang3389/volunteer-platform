<script lang="ts">
    async function getEvents() {
        const response = await fetch('/api/get/event', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Error fetching events');
        }
    }

    // const events = await getEvents();
    const events = [
        {
            name: "Event 1",
            startDate: "Jan 1st",
            endDate: "Jan 2nd",
            eventId: "1",
        },
        {
            name: "Event 2",
            startDate: "Jan 1st",
            endDate: "Jan 2nd",
            eventId: "2",
        },
        {
            name: "Event 3",
            startDate: "Jan 1st",
            endDate: "Jan 2nd",
            eventId: "3",
        },
    ];
</script>

<div class="events-container">
    {#each events as { name, startDate, endDate, eventId }}
      <div class="event-container">
        <div class="event-block">
          <h2 class="text-2xl font-bold">{name}</h2>
          <p class="text-lg">Start Date: {startDate}</p>
          <p class="text-lg">End Date: {endDate}</p>
          <a href="../events/{eventId}" class="text-blue-500 underline">Event Page</a>
        </div>
      </div>
    {/each}
  </div>


<style>
.events-container {
    width: 100%;
}

.event-container {
    display: grid;
    padding-bottom: 1rem;
  }

  .event-block {
    border: 0.4rem solid #ccc;
    border-radius: 10%;
    padding: 10px;
    text-align: center;
  }
</style>