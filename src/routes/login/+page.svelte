<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/fb';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	const provider = new GoogleAuthProvider();

	function handleClick() {
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken!;
				console.log('OK');
				goto('/');
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<h1>Login</h1>
<button onclick={handleClick}>Sign in with Google</button>
