
<script lang="ts">
    async function get(): Promise<{ status: number, body: any }> {
        const res = await fetch("/api/insertorg", {
                method: "POST",
                body: JSON.stringify({ name: "Jtes", password: "bruh", description: "123" }),
                headers: {
                    "Content-Type": "application/json"
                }
        });
        return {
            status: await res.status,
            body: await res.text()
        };
    }
    
</script>

{#await get()}
	<p>...waiting</p>
{:then { status, body }}
	<p>{status} {body}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}