<script lang="ts">
	import type { Snippet } from 'svelte';
	import clsx from 'clsx';
	import { X } from 'lucide-svelte';

	interface BlockProps {
		fill?: number;
		hide?: boolean;
		hover?: boolean;
		children?: Snippet;
		onmousedown?: (e: MouseEvent) => void;
		onmousemove?: (e: MouseEvent) => void;
	}

	const { fill, hide, hover, children, onmousedown, onmousemove }: BlockProps = $props();

	function handleDragStart(e: MouseEvent) {
		e.preventDefault();
	}
</script>

<button
	type="button"
	class={clsx(
		'flex h-8 w-8 cursor-default items-center justify-center font-medium outline-none transition-colors',
		{
			'bg-white': fill === 0 && !hover,
			'bg-blue-100': fill === 0 && hover,
			'bg-black': fill === 1
		}
	)}
	{onmousedown}
	{onmousemove}
	ondragstart={handleDragStart}
>
	{#if fill === 2}
		{#if !hide}
			<X class="h-full w-full" />
		{/if}
	{:else}
		{@render children?.()}
	{/if}
</button>
