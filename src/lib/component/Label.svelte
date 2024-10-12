<script lang="ts">
	import type { Snippet } from 'svelte';
	const { text, children }: { text: string; children: Snippet } = $props();
</script>

<label class="flex flex-col">
	<span class="text-sm font-medium">{text}</span>
	{@render children()}
</label>
