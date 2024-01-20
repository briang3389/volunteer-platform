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
  <input type="text" bind:value={name} placeholder="Full Name" />
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />

  <label>
    <input type="radio" bind:group={accountType} value="volunteer" checked>
    Volunteer
  </label>
  <label>
    <input type="radio" bind:group={accountType} value="organization">
    Organization
  </label>

  <button type="submit">Sign Up</button>
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
