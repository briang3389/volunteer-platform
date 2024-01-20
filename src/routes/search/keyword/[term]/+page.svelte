<script>
    export let data;

    let searchTerm = data.initialSearchTerm;
    let searchType = "event";
    let searchResults = data.initialSearchResults;

    async function getSearchResults() {
        console.log(searchTerm);
        const response = await fetch("/api/search/keyword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: searchType,
                name: searchTerm,
            }),
        });

        const results = await response.json();
        if (results.success) {
            searchResults = results.data;
        }
    }
</script>

<form on:submit|preventDefault={getSearchResults}>
    <label for="search">Search</label>
    <input id="search" type="text" bind:value={searchTerm} placeholde="Search"/>
    <label for="user">Users</label>
    <input type="radio" name="searchType" id="user" value="user" bind:group={searchType}/>
    <label for="org">Organizations</label>
    <input type="radio" name="searchType" id="org" value="org" bind:group={searchType}/>
    <label for="event">Events</label>
    <input type="radio" name="searchType" id="event" value="event" bind:group={searchType} checked/>
    <button type="submit">Submit</button>
</form>
<table>
    {#each searchResults as result (result.id)}
        <tr>
            <td>
                {result.name}
            </td>
        </tr>
    {/each}
</table>