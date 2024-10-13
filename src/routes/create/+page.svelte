<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import PageTitle from '$lib/component/PageTitle.svelte';
	import TextField from '$lib/component/TextField.svelte';
	import Label from '$lib/component/Label.svelte';
	import Button from '$lib/component/Button.svelte';

	let width = $state('0');
	let height = $state('0');
	let val: { h: string[]; v: string[] } = $state({ h: [], v: [] });
	let parsed = $derived.by(() => {
		try {
			return JSON.stringify({
				h: val.h.reduce((prev: string[], cur) => {
					prev.push(JSON.parse(`[${cur}]`));
					return prev;
				}, []),
				v: val.v.reduce((prev: string[], cur) => {
					prev.push(JSON.parse(`[${cur}]`));
					return prev;
				}, [])
			});
		} catch {
			return '';
		}
	});

	$effect(() => {
		if (width) untrack(() => (val.h = Array(parseInt(width)).fill('')));
	});
	$effect(() => {
		if (height) untrack(() => (val.v = Array(parseInt(height)).fill('')));
	});
</script>

<PageTitle>Create Problem</PageTitle>
<form class="flex w-full flex-col gap-8" method="post" use:enhance>
	<div class="flex w-full">
		<div class="mt-4 flex w-[380px] flex-col gap-4">
			<Label text="Code">
				<TextField type="text" name="code" />
			</Label>
			<Label text="Title">
				<TextField type="text" name="title" />
			</Label>
			<Label text="Difficulty">
				<TextField type="text" name="difficulty" />
			</Label>
			<Label text="Width">
				<TextField type="text" name="width" bind:value={width} />
			</Label>
			<Label text="Height">
				<TextField type="text" name="height" bind:value={height} />
			</Label>
		</div>
		<div class="flex gap-2">
			<div class="w-[200px] shrink-0 grow">
				<h2 class="w-full text-xl font-bold">Horizontal(L -> R)</h2>
				{#if width}
					{#each Array(parseInt(width))
						.fill(0)
						.map((_, id) => id) as id (id)}
						<div class="flex w-full">
							<span class="w-[32px]">{id + 1}</span>
							<TextField type="text" bind:value={val.h[id]} />
						</div>
					{/each}
				{/if}
			</div>
			<div class="w-[200px] shrink-0 grow">
				<h2 class="w-full text-xl font-bold">Vertical(T -> B)</h2>
				{#if height}
					{#each Array(parseInt(height))
						.fill(0)
						.map((_, id) => id) as id (id)}
						<div class="flex w-full">
							<span class="w-[32px]">{id + 1}</span>
							<TextField type="text" bind:value={val.v[id]} />
						</div>
					{/each}
				{/if}
			</div>
			<textarea class="resize-none rounded border bg-slate-50" readonly name="value" value={parsed}
			></textarea>
		</div>
	</div>
	<div>
		<Button type="submit">Create</Button>
	</div>
</form>
