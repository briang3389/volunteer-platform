<script lang="ts">
    import TopBar from '$lib/TopBar.svelte'
	  import VolunteerEventList from '$lib/VolunteerEventList.svelte';
    import KeywordSearchBar from '$lib/KeywordSearchBar.svelte';
    import { page } from '$app/stores';

    export let data: any;

    async function getInfo() {
        const response = await fetch('/api/get/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({username: data.username})
        });
        if (response.ok) {
            const data = await response.json();
            return {success: true, info: data};
        } else {
            return {success: false, info: []}
        }
    }
    
</script>

<TopBar token={data.token}/>

<div class="container">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        {#await getInfo()}
          <p>...waiting</p>
        {:then { success, info }}
        {#if success}
            {#if info.data.length !== 0}
                <div class="info-container">
                  <div class="profile-container">
                    <img src={info.data[0].icon_url} alt="" class="profile-picture">
                    <p class="profile-name">{info.data[0].name}</p>  
                  </div>
                  <VolunteerEventList userid={info.data[0].userid}/>

                  <div class="contact-container">
                      <p class="contact-header">Contact Information</p>
                      <p class="profile-email-header">Email: <span class="profile-email">{info.data[0].email}</span></p>
                  </div>
                </div>
            {:else}
            <p>Failed to fetch user information</p>
            {/if}
        {:else}
        <p>Failed to fetch user information</p>
      {/if}
        {:catch error}
        <p style="color: red">{error.message}</p>
        {/await}
</div>

<style>
.container {
    margin:auto;
    width: 50%;
}
.profile-container {
    padding-top: 3rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    width:max-content;
  }

  .profile-picture {
    border-radius: 50%;
    margin-right: 10px;
    width: 7rem;
    height: 7rem;
    border-width: 2px;
  }

  .profile-name {
    font-size: 4rem;
    font-weight: bold;
  }

  .info-container {
    padding-top: 2rem;
    padding-left: 1rem;
  }

  .contact-header {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .profile-email-header {
    font-size: 1.5rem;
  }

  .profile-email {
    color: #555;
  }

  .contact-container {
    padding-bottom: 1rem;
  }
</style>