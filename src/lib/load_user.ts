export async function load_user() {
    const res = await fetch('/api/loaduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let data = (await res.json()).token;
    return data;
}