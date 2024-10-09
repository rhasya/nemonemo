<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		type?: 'button' | 'submit';
		children: Snippet;
	}

	const { type, children }: ButtonProps = $props();
</script>

<button
	class="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-600 disabled:bg-slate-700/60"
	{type}>{@render children()}</button
>
