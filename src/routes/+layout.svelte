<script lang="ts">
	import '../app.css';
	import Nav from './Nav.svelte';

	const { children, data } = $props();
</script>

<svelte:head>
	<title>SVELTE NEMONEMO</title>
</svelte:head>

<div class="flex h-screen">
	<Nav username={data.user?.username} />
	<main class="h-full w-full grow px-4 py-4" oncontextmenu={(e) => e.preventDefault()}>
		{@render children()}
	</main>
</div>
