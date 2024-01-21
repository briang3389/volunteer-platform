<script>
  import { createUser, createOrg } from "$lib/login";
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
	import TopBar from "$lib/TopBar.svelte";

  let accountType = 'volunteer';
  let name = '';
  let username = '';
  let email = '';
  let password = '';
  let description = '';
  let error = false;
  export let data;

  let profilePicUrl = '/default_profile_pic.jpg';

  const handleSubmit = async () => {
    try {
      let success = false;
      if (accountType === "volunteer") {
        success = await createUser({
          name: name,
          username: username,
          email: email,
          password: password,
          profilePicUrl
        });
      } else {
        success = await createOrg({
          name: username,
          password: password,
          description: description,
          profilePicUrl
        });
      }

      if (success) {
        window.location = "/";
      } else {
        error = true;
      }
    } catch (error) {
      error = true;
    }
  };

  onDestroy(() => {
  });
</script>

<TopBar token={data.token}/>

<form on:submit|preventDefault={handleSubmit} class="max-w-md mx-auto p-4">
  {#if accountType === "volunteer"}
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="text" bind:value={name} placeholder="Full Name" />
  {/if}
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="text" bind:value={username} placeholder="Username" />
  {#if accountType === "volunteer"}
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="email" bind:value={email} placeholder="Email" />
  {/if}
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="password" bind:value={password} placeholder="Password" />
  {#if accountType === "organization"}
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="text" bind:value={description} placeholder="Description" />
  {/if}
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="text" bind:value={profilePicUrl} placeholder="/default_profile_pic.jpg" />


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
  {#if error}
    <div class="w-full py-4 flex place-content-center">
      <p class="text-red-600">Username Taken</p>
    </div>
  {/if}
</form>

<style>
  /* Add your CSS styling here */
  label {
    margin-right: 10px;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    display: block;
    margin-bottom: 10px;
  }
</style>
