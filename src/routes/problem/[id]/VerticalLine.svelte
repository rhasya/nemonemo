<script lang="ts">
	import Block from './Block.svelte';

	const { numbers, size }: { numbers: number[]; size?: number } = $props();
</script>

<div class="mb-[-1px] flex h-full flex-row justify-end">
	{#if size}
		{#each Array(size - numbers.length).fill(0) as i}
			<div class="ml-[-1px] border border-black"><Block /></div>
		{/each}
	{/if}
	{#each numbers as number}
		<div class="ml-[-1px] border border-black"><Block>{number}</Block></div>
	{/each}
</div>
