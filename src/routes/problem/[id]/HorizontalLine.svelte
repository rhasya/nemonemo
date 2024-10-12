<script lang="ts">
	import Block from './Block.svelte';

	const { numbers, size }: { numbers: number[]; size?: number } = $props();
</script>

<div class="mr-[-1px] flex h-full flex-col justify-end">
	{#if size}
		{#each Array(size - numbers.length).fill(0) as i}
			<div class="mt-[-1px] border border-black"><Block /></div>
		{/each}
	{/if}
	{#each numbers as number}
		<div class="mt-[-1px] border border-black"><Block>{number}</Block></div>
	{/each}
</div>
