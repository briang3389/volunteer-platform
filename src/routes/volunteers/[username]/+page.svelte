<script lang="ts">
    import TopBar from '$lib/TopBar.svelte'
	import VolunteerEventList from '$lib/VolunteerEventList.svelte';
    import KeywordSearchBar from '$lib/KeywordSearchBar.svelte';

    async function getHours() {
        const response = await fetch('/api/get/user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Error fetching events');
        }
    }

    const info = {
        totalHours: 5,
        totalOrgs: 2,
        imageUrl: "/default_profile_pic.jpg",
        name: "Nick Andry",
        email: "me@me.com",
    }

</script>

<TopBar/>

<div class="search-container">
    <KeywordSearchBar/>
</div>
<div class="container">
    <div class="profile-container">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={info.imageUrl} alt="Profile Picture" class="profile-picture">
        <p class="profile-name">{info.name}</p>
    </div>

    <div class="info-container">

        <div class="totals-container">
            <div class="totals">
                <p>Total Hours Volunteered: {info.totalHours}</p>
                <p>Total Organizations Helped: {info.totalOrgs}</p>
            </div>
        </div>

        <VolunteerEventList/>

        <div class="contact-container">
            <p class="contact-header">Contact Information</p>
            <p class="profile-email-header">Email: <span class="profile-email">{info.email}</span></p>
        </div>
    </div>
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

  .search-container {
    float:right;
    padding-right: 3rem;
  }

  .totals-container {
    text-align: left;
    margin-bottom: 20px;
  }

  .totals {
    font-size: 2rem;
    font-weight: bold;
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