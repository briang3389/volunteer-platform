<script lang="ts">
    async function getEvents() {
        const response = await fetch('/api/get/user/eventlog', {
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
            hours: "5",
            eventId: "1",
        },
        {
            name: "Event 2",
            hours: "4",
            eventId: "2",
        },
        {
            name: "Event 3",
            hours: "3",
            eventId: "3",
        }
    ];
</script>

<div class="events-container">
    {#each events as { name, hours, eventId }}
      <div class="event-container">
        <div class="event-block">
          <h2 class="text-2xl font-bold">{name}</h2>
          <p class="text-lg">Hours: {hours}</p>
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
    border: 0.4rem solid #999;
    border-radius: 10%;
    padding: 10px;
    text-align: center;
  }
</style>