<script lang="ts">
	const { username }: { username?: string } = $props();
</script>

<aside class="flex h-full w-[180px] shrink-0 flex-col gap-4 bg-slate-100 px-4 py-4">
	<h1 class="text-2xl font-bold"><a href="/">NEMONEMO</a></h1>
	<menu class="flex flex-col gap-2">
		{#if username}
			<li><form method="post" action="/?/logout"><button type="submit">Logout</button></form></li>
			<li><a href="/list">List</a></li>
			<li><a href="/create">Create</a></li>
		{:else}
			<li><a href="/login">Login</a></li>
		{/if}
	</menu>
</aside>

<style>
</style>
