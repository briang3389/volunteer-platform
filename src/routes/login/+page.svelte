
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

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button type="submit">Log In</button>
</form>

<style>
  /* Add your CSS styling here */
</style>
