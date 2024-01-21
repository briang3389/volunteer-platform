<script lang="ts">
	function getReadableDate(isoString: string) {
		let date = new Date(isoString);
		return date.toDateString();
	}
	export let orgid: number;

	async function getEvents() {
		try {
			const eventdata = await fetch('/api/get/event/eventbyorgid', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ orgid: orgid })
			});
			const data = await eventdata.json();
			if (data.data.length === 0) {
				return {
					events: {
						data: [
							{
								name: 'No events',
								description: 'This org has not created any events',
								startdate: '',
								enddate: '',
								location: '',
								icon_url: '',
								eventid: undefined
							}
						]
					}
				};
			}
			return { events: data };
		} catch (error) {
			throw new Error('Error fetching events');
		}
	}
</script>

<div class="events-container">
	{#await getEvents()}
		<p>...waiting</p>
	{:then { events }}
		{#each events.data as { name, startdate, enddate, eventid, icon_url }}
			<div class="event-container shadow-lg">
				<div class="event-block">
					<div class="flex items-center">
						{#if name !== 'No events'}
							<img
								src={icon_url}
								alt="{name} Image"
								class="event-picture mr-4 object-cover rounded-full"
							/>
						{/if}
						<div>
							<h2 class="text-2xl font-bold">{name}</h2>
							{#if name !== 'No events'}
								<p class="text-lg">Start Date: {getReadableDate(startdate)}</p>
								<p class="text-lg">End Date: {getReadableDate(enddate)}</p>
								<a href="../events/{eventid}" class="text-blue-500 underline">Event Page</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.event-picture {
		width: 7rem;
		height: 7rem;
	}

	.event-container {
		display: grid;
		margin-bottom: 1rem;
		width: 50rem;
		background-color: #eff;
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
