<script lang="ts">
	import '../app.css';
	import Nav from './Nav.svelte';

	const { children } = $props();
</script>

<svelte:head>
	<title>SVELTE NEMONEMO</title>
</svelte:head>

<Nav />
<main class="main" oncontextmenu={(e) => e.preventDefault()}>
	{@render children()}
</main>
