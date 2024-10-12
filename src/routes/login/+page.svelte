<script lang="ts">
	import { enhance } from '$app/forms';
	import PageTitle from '$lib/component/PageTitle.svelte';
	import TextField from '$lib/component/TextField.svelte';

	const { form } = $props();
	let input = $state({ username: '', password: '' });

	$effect(() => {
		input = { username: form?.username ?? '', password: form?.password ?? '' };
	});

	function validate(obj: Record<string, unknown>) {
		if ('username' in obj && !obj.username) return false;
		if ('password' in obj && !obj.password) return false;

		return true;
	}
</script>

<PageTitle>Login</PageTitle>
<p class="text-sm text-gray-600">Enter your username and password to access your account.</p>
<form
	class="contents"
	method="post"
	use:enhance={({ formData, cancel }) => {
		if (!validate(Object.fromEntries(formData))) {
			cancel();
		}
	}}
>
	<div class="mt-8 flex max-w-[380px] flex-col gap-2">
		<label class="flex flex-col">
			<span class="text-sm font-medium">Username</span>
			<TextField type="text" placeholder="username" name="username" bind:value={input.username} />
		</label>
		<label class="flex flex-col">
			<span class="text-sm font-medium">Password</span>
			<TextField type="password" name="password" bind:value={input.password} />
		</label>
	</div>
	<div class="mt-8 max-w-[380px]">
		<button
			class="pointer-events-none w-full rounded bg-slate-700 py-1.5 text-sm font-medium text-white hover:bg-slate-600 disabled:bg-slate-700/60"
			disabled={!input.username || !input.password}>Log in</button
		>
	</div>
</form>
<p class="mt-4 text-sm text-red-700">{form?.error}</p>
