<script lang="ts">
	import Button from '$lib/component/Button.svelte';
	import PageTitle from '$lib/component/PageTitle.svelte';
	import Block from './Block.svelte';
	import HorizontalLine from './HorizontalLine.svelte';
	import VerticalLine from './VerticalLine.svelte';

	const { data } = $props();
	let board = $state(
		Array(data.problem.height)
			.fill(0)
			.map(() => Array(data.problem.width).fill(0))
	);

	const value: { h: number[][]; v: number[][] } = $derived.by(() => {
		try {
			return JSON.parse(data.problem.value ?? '{"v": [], "h": []}');
		} catch {
			return { v: [], h: [] };
		}
	});

	const maxHorizontalSize = $derived(value.h.reduce((prev, cur) => Math.max(prev, cur.length), 0));
	const maxVerticalSize = $derived(value.v.reduce((prev, cur) => Math.max(prev, cur.length), 0));

	function handleCellMousedown(r: number, c: number, e: MouseEvent) {
		// LEFT
		if (e.button === 0) {
			if (board[r][c] === 1) board[r][c] = 0;
			else board[r][c] = 1;
		}
		// RIGHT
		else if (e.button === 2) {
			if (board[r][c] === 2) board[r][c] = 0;
			else board[r][c] = 2;
		}
	}

	function handleInitClick() {
		board = Array(data.problem.height)
			.fill(0)
			.map(() => Array(data.problem.width).fill(0));
	}
</script>

<PageTitle>{data.problem.title}</PageTitle>
<div class="mt-8 grid max-w-[640px] grid-cols-[1fr,2fr] grid-rows-2">
	<div class=""></div>
	<div class="flex">
		{#each value.h as numbers}
			<HorizontalLine {numbers} size={maxHorizontalSize} />
		{/each}
	</div>
	<div class="flex flex-col">
		{#each value.v as numbers}
			<VerticalLine {numbers} size={maxVerticalSize} />
		{/each}
	</div>
	<div class="flex flex-col">
		{#each board as row, r}
			<div class="mb-[-1px] flex">
				{#each row as cell, c}
					<div class="mr-[-1px] border border-black">
						<Block fill={cell} onmousedown={handleCellMousedown.bind(null, r, c)} />
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
<div class="mt-4">
	<Button onclick={handleInitClick}>초기화</Button>
</div>
