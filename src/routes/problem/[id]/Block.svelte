<script lang="ts">
	import type { Snippet } from 'svelte';
	import clsx from 'clsx';
	import { X } from 'lucide-svelte';

	const {
		fill,
		children,
		onmousedown
	}: { fill?: number; children?: Snippet; onmousedown?: (e: MouseEvent) => void } = $props();

	function handleMouseDown(e: MouseEvent) {
		onmousedown?.(e);
	}
</script>

<button
	type="button"
	class={clsx('flex h-8 w-8 cursor-default items-center justify-center font-medium outline-none', {
		'bg-white': fill === 0,
		'bg-black': fill === 1
	})}
	onmousedown={handleMouseDown}
>
	{#if fill === 2}
		<X class="h-8 w-8" />
	{:else}
		{@render children?.()}
	{/if}
</button>
