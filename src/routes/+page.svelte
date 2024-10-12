<script>
	import PageTitle from '$lib/component/PageTitle.svelte';

	const { data } = $props();
</script>

<PageTitle>NEMONEMO</PageTitle>
<p>Welcome to nemonemo game.</p>

{#if data.user}
	<p>Hello, {data.user?.username}</p>
{/if}
