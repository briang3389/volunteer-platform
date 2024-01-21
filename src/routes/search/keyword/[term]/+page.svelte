<script>
    import TopBar from "$lib/TopBar.svelte";
    import { userSession } from '$lib/sessionStore';
    import { onDestroy } from 'svelte';
    export let data;

    let searchTerm = data.initialSearchTerm;
    let searchType = "event";
    let searchResults = data.initialSearchResults;

    async function getSearchResults() {
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
    
    function getUrlRedirect(result) {
        let url = "http://localhost:5173/";
        if (searchType === "user") {
            url += `volunteers/${result.username}`;

        } else if (searchType === "org") {
            url += `orgs/${result.name}`;
        } else {
            url += `events/${result.id}`;
        }
        return url;
    }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
    <TopBar token={data.token} />
    <div class="container mx-auto my-10 p-6 max-w-xl bg-white rounded shadow-md">
        <form on:submit|preventDefault={getSearchResults} class="space-y-4">
            <div>
                <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
                <input id="search" type="text" bind:value={searchTerm} placeholder="Search" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center">
                    <input type="radio" name="searchType" id="user" value="user" bind:group={searchType} class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                    <label for="user" class="ml-2 block text-sm font-medium text-gray-700">Users</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" name="searchType" id="org" value="org" bind:group={searchType} class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                    <label for="org" class="ml-2 block text-sm font-medium text-gray-700">Organizations</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" name="searchType" id="event" value="event" bind:group={searchType} checked class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                    <label for="event" class="ml-2 block text-sm font-medium text-gray-700">Events</label>
                </div>
            </div>

            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </form>
    </div>
    <div class="container mx-auto my-10 p-6 max-w-xl bg-white rounded shadow-md">
        <table class="min-w-full leading-normal">
            {#each searchResults as result (result.id)}
                <tr class="hover:bg-gray-100">
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <a class="text-gray-900 whitespace-no-wrap" href={getUrlRedirect(result)}>{result.name}</a>
                    </td>
                </tr>
            {/each}
        </table>
    </div>
</div>
