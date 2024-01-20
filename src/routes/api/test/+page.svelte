
<script lang="ts">
    async function get(): Promise<{ status: number, body: any }> {
        const res = await fetch("/api/genqr", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: "test"
                })
        });
        return {
            status: await res.status,
            body: await res.json()
        };
    }
    
</script>

{#await get()}
	<p>...waiting</p>
{:then { status, body }}
	<img src={body.data} alt='a'>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}