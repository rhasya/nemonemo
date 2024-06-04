<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/fb';
	import { onAuthStateChanged, signOut, type User } from 'firebase/auth';

	let user: User | null = $state(null);

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			user = currentUser;
		} else {
			user = null;
		}
	});

	function handleLogout() {
		signOut(auth).then(() => {
			goto('/login');
		});
	}
</script>

<aside>
	<h1><a href="/">NEMONEMO</a></h1>
	{#if !!user}
		<p class="userinfo">{user.email}</p>
	{/if}
	<ul>
		{#if !!user}
			<li><button onclick={handleLogout} class="logout">Logout</button></li>
		{:else}
			<li><a href="/login">Login</a></li>
		{/if}
		<li><a href="/list">List</a></li>
		<li><a href="/makeprob">Make Problem</a></li>
	</ul>
</aside>

<style>
	aside {
		background-color: lightgray;
		width: 200px;

		display: flex;
		flex-direction: column;
		align-items: flex-start;

		h1 {
			width: 100%;
			text-align: center;
		}

		.userinfo {
			width: 100%;
			text-align: center;
			margin: 0;
		}

		ul {
			width: 100%;
			list-style: none;
			padding: 0px 1rem;
			display: flex;
			flex-direction: column;
			li {
				&:hover {
					background-color: aliceblue;
				}
				a {
					display: inline-block;
					text-decoration: none;
					color: inherit;
					width: 100%;
					height: 100%;
					padding: 0.5rem 1rem;
				}
				button.logout {
					background-color: transparent;
					border: none;
					padding: 0;
					cursor: pointer;
					width: 100%;

					height: 100%;
					text-align: left;
					padding: 0.5rem 1rem;
				}
			}
		}
	}
</style>
