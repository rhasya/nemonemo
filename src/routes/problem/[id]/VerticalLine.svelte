<script lang="ts">
	import clsx from 'clsx';
	import Block from './Block.svelte';

	const { numbers, size, index }: { numbers: number[]; size?: number; index?: number } = $props();
</script>

<div class={clsx('flex h-full flex-row justify-end', { 'mb-[-1px]': (index ?? 0) % 5 !== 4 })}>
	{#if size}
		{#each Array(size - numbers.length).fill(0) as i}
			<div class="ml-[-1px] border border-black"><Block /></div>
		{/each}
	{/if}
	{#each numbers as number}
		<div class="ml-[-1px] border border-black"><Block>{number}</Block></div>
	{/each}
</div>
