<script>
  import { registerUser } from '$lib/authService';

  let accountType = 'volunteer'; // Default account type
  let name = ''; // Variable to store the user's name
  let username = ''; // Variable to store the username
  let email = ''; // Variable to store the email
  let password = ''; // Variable to store the password

  // Function to handle form submission
  const handleSubmit = async () => {
    const userData = { name, username, email, password, accountType };
    try {
      const result = await registerUser(userData);
      if (result) {
        goto('/'); // Redirect to the homepage
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" bind:value={name} placeholder="Full Name" />
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" bind:value={username} placeholder="Username" />
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" bind:value={email} placeholder="Email" />
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" bind:value={password} placeholder="Password" />

  <div class="flex items-center mt-4">
    <label class="inline-flex items-center">
      <input type="radio" class="form-radio" bind:group={accountType} value="volunteer" checked>
      <span class="ml-2">Volunteer</span>
    </label>
    <label class="inline-flex items-center ml-6">
      <input type="radio" class="form-radio" bind:group={accountType} value="organization">
      <span class="ml-2">Organization</span>
    </label>
  </div>
  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4" type="submit">Sign Up</button>
</form>

<style>
  /* Add your CSS styling here */
  label {
    margin-right: 10px;
  }
  input {
    display: block;
    margin-bottom: 10px;
  }
</style>
