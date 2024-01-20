
<script>
  import { loginUser } from '$lib/authService';
  import { goto } from '$app/navigation';
  let username = '';
  let password = '';

  const handleSubmit = async (event) => {
    try {
      const result = await loginUser({ username, password });
      if (result) {
        goto('/'); // Redirect to the homepage
      }
    } catch (error) {
      // Handle login errors
      console.error(error);
    }
  };
</script>

<form class="w-full max-w-sm mx-auto mt-6" on:submit|preventDefault={handleSubmit}>
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" bind:value={username} placeholder="Username" />
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4" type="password" bind:value={password} placeholder="Password" />
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4" type="submit">Log In</button>
</form>

<style>
  /* Add your CSS styling here */
</style>
