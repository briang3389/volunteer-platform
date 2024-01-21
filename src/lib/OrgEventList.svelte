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
            imageUrl: "/default_profile_pic.jpg",
        },
        {
            name: "Event 2",
            startDate: "Jan 1st",
            endDate: "Jan 2nd",
            eventId: "2",
            imageUrl: "/default_profile_pic.jpg",
        },
        {
            name: "Event 3",
            startDate: "Jan 1st",
            endDate: "Jan 2nd",
            eventId: "3",
            imageUrl: "/default_profile_pic.jpg",
        },
    ];
</script>

<div class="events-container">
    {#each events as { name, startDate, endDate, eventId, imageUrl }}
      <div class="event-container">
        <div class="event-block">
          <div class="flex items-center"> <!-- Added flex container for alignment -->
            <img src="{imageUrl}" alt="{name} Image" class="event-picture mr-4 object-cover rounded-full"> <!-- Adjust the image size as needed -->
            <div>
              <h2 class="text-2xl font-bold">{name}</h2>
              <p class="text-lg">Start Date: {startDate}</p>
              <p class="text-lg">End Date: {endDate}</p>
              <a href="../events/{eventId}" class="text-blue-500 underline">Event Page</a>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>


<style>

  .event-container {
    display: grid;
    margin-bottom: 1rem;
    width: 50rem;
    border: 0.4rem solid #999;
    border-radius: 1rem;
  }

  .event-picture {
    border-radius: 50%;
    margin-right: 10px;
    width: 4rem;
    height: 4rem;
    border-width: 2px;
  }

  .event-block {
    padding: 10px;
    width: 35%;
    margin: auto;
    text-align: center;
    width: max-content;
  }
</style>