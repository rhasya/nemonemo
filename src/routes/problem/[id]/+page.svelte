<script lang="ts">
	import Button from '$lib/component/Button.svelte';
	import PageTitle from '$lib/component/PageTitle.svelte';
	import clsx from 'clsx';
	import Block from './Block.svelte';
	import HorizontalLine from './HorizontalLine.svelte';
	import VerticalLine from './VerticalLine.svelte';

	const { data } = $props();
	let board = $state(
		data.board ??
			Array(data.problem.height)
				.fill(0)
				.map(() => Array(data.problem.width).fill(0))
	);
	let hide = $state(false);

	const value: { h: number[][]; v: number[][] } = $derived.by(() => {
		try {
			return JSON.parse(data.problem.value ?? '{"v": [], "h": []}');
		} catch {
			return { v: [], h: [] };
		}
	});

	const maxHorizontalSize = $derived(value.h.reduce((prev, cur) => Math.max(prev, cur.length), 0));
	const maxVerticalSize = $derived(value.v.reduce((prev, cur) => Math.max(prev, cur.length), 0));

	function handleCellMouseDown(r: number, c: number, e: MouseEvent) {
		// LEFT Button
		if (e.buttons === 1) {
			if (board[r][c] === 1) board[r][c] = 0;
			else board[r][c] = 1;
		}
		// RIGHT Button
		else if (e.buttons === 2) {
			if (board[r][c] === 2) board[r][c] = 0;
			else board[r][c] = 2;
		}
	}

	function handleCellMouseMove(r: number, c: number, e: MouseEvent) {
		// LEFT
		if (e.buttons === 1) {
			if (board[r][c] === 0) board[r][c] = 1;
		}
		// Right Button
		else if (e.buttons === 2) {
			if (board[r][c] === 0) board[r][c] = 2;
		}
	}

	function handleInitClick() {
		board = Array(data.problem.height)
			.fill(0)
			.map(() => Array(data.problem.width).fill(0));
	}

	function handleHideClick() {
		hide = !hide;
	}

	async function handleSaveClick() {
		const input = JSON.stringify(board);
		const res = await fetch('/api/problems', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: data.userId,
				problemId: data.problem.id,
				board: JSON.stringify(board)
			})
		});

		if (res.ok) {
			console.log('ok');
		}
	}
</script>

<PageTitle>{data.problem.title}</PageTitle>
<div class="mt-8 grid w-fit grid-cols-[auto,auto] grid-rows-[auto,auto]">
	<div></div>
	<div class="flex">
		{#each value.h as numbers, i}
			<HorizontalLine {numbers} size={maxHorizontalSize} index={i} />
		{/each}
	</div>
	<div class="flex flex-col">
		{#each value.v as numbers, i}
			<VerticalLine {numbers} size={maxVerticalSize} index={i} />
		{/each}
	</div>
	<div class="flex flex-col">
		{#each board as row, r}
			<div class={clsx('flex', { 'mb-[-1px]': r % 5 !== 4 })}>
				{#each row as cell, c}
					<div class={clsx('border border-black', { 'mr-[-1px]': c % 5 !== 4 })}>
						<Block
							fill={cell}
							{hide}
							onmousedown={handleCellMouseDown.bind(null, r, c)}
							onmousemove={handleCellMouseMove.bind(null, r, c)}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
<div class="mt-4">
	<Button variant="secondary" onclick={handleInitClick}>초기화</Button>
	<Button variant="secondary" onclick={handleHideClick}>{!hide ? 'X숨기기' : 'X보이기'}</Button>
	<Button onclick={handleSaveClick}>저장</Button>
</div>
<footer class="h-8"></footer>
