<script lang="ts">
	import NemoButton from '$lib/component/NemoButton.svelte';

	const { data } = $props();
	const id = $derived(data.id);

	const modeStr = ['Clear', 'Fill', 'X', 'Toggle'];
	const initData = [...Array(data.sizeVer).keys()].map(() => Array(data.sizeHor).fill(0));

	let mode: 0 | 1 | 2 | 3 = $state(3);
	let board = $state([...initData]);
	let hideX = $state(false);

	$effect(() => {
		const saveId = `board-${id}`;
		const saved = localStorage.getItem(saveId);
		if (saved) {
			board = JSON.parse(saved);
		}

		return () => {
			localStorage.setItem(saveId, JSON.stringify(board));
		};
	});

	// ----------- EVENT HANDLER ---------------

	function handleMouseDown(row_idx: number, col_idx: number, e: MouseEvent) {
		e.preventDefault();
		if (e.buttons <= 0) return;

		if (mode === 3) {
			if (e.button === 0) {
				// LEFT
				if (board[row_idx][col_idx] === 1) {
					board[row_idx][col_idx] = 0;
				} else {
					board[row_idx][col_idx] = 1;
				}
			} else if (e.button === 2) {
				// RIGHT
				if (board[row_idx][col_idx] === 2) {
					board[row_idx][col_idx] = 0;
				} else {
					board[row_idx][col_idx] = 2;
				}
			}
		} else {
			board[row_idx][col_idx] = mode;
		}
	}

	function handleMouseEnter(row_idx: number, col_idx: number, e: MouseEvent) {
		if (e.buttons <= 0) return;

		if (mode === 3) {
			// console.log('MouseEnter ', e);
			if (e.buttons === 1) {
				board[row_idx][col_idx] = 1;
			} else if (e.buttons === 2) {
				board[row_idx][col_idx] = 2;
			}
		}
	}

	function handleKeyUpBody(e: KeyboardEvent) {
		if (e.key === '1') {
			mode = 1;
		} else if (e.key === '2') {
			mode = 2;
		} else if (e.key === '3') {
			mode = 3;
		} else if (e.key === '0') {
			mode = 0;
		}
	}

	function handleClickMode() {
		if (mode === 0) {
			mode = 1;
		} else if (mode === 1) {
			mode = 2;
		} else if (mode === 2) {
			mode = 3;
		} else {
			mode = 0;
		}
	}

	function handleClickInit() {
		localStorage.removeItem(`board-${id}`);
		board = [...initData];
	}

	function handleClickHideX() {
		hideX = !hideX;
	}
</script>

<svelte:body onkeyup={handleKeyUpBody} />

<h1>{data.title}</h1>
<div class="grid">
	<div class="blank">
		<button onclick={handleClickInit}>Initialize</button>
		<button onclick={handleClickMode}>MODE: {modeStr[mode]}</button>
		<button onclick={handleClickHideX}>Hide X : {hideX}</button>
		<a href="/list">Back To List</a>
	</div>
	<div class="top">
		{#each data.pHor as row, idx}
			<div class="top__row">
				{#each row as value}
					<div class="cell" style:--bwh={(idx + 1) % 5 === 0 ? '2px' : '1px'}>
						{value === 0 ? '' : `${value}`}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<div class="left">
		{#each data.pVer as row, idx}
			<div class="left__row" style:--bwv={(idx + 1) % 5 === 0 ? '2px' : '1px'}>
				{#each row as value}
					<div class="cell">{value === 0 ? '' : `${value}`}</div>
				{/each}
			</div>
		{/each}
	</div>
	<div class="board" style:--r={data.sizeVer} style:--c={data.sizeHor}>
		{#each board as row, row_idx}
			{#each row as cell, col_idx}
				<NemoButton
					variant={cell}
					verEnd={!((row_idx + 1) % 5)}
					horEnd={!((col_idx + 1) % 5)}
					onmousedown={handleMouseDown.bind(null, row_idx, col_idx)}
					onmouseenter={handleMouseEnter.bind(null, row_idx, col_idx)}
				/>
			{/each}
		{/each}
	</div>
</div>

<style>
	div.grid {
		--border-color: gray;

		display: grid;

		grid-template-rows: 200px auto;
		grid-template-columns: 200px auto;

		div.blank {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			gap: 4px;
			padding-bottom: 2rem;

			border-bottom: 1px solid var(--border-color);
			border-right: 1px solid var(--border-color);
		}

		div.top {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;

			border-bottom: 1px solid var(--border-color);

			.top__row {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
			}
		}

		div.left {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			border-right: 1px solid var(--border-color);

			.left__row {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
			}
		}

		div.board {
			display: grid;
			grid-template-rows: repeat(var(--r), 1.5rem);
			grid-template-columns: repeat(var(--c), 1.5rem);
		}
	}

	div.cell {
		width: 1.5rem;
		height: 1.5rem;

		display: flex;
		justify-content: center;
		align-items: center;

		border-bottom: var(--bwv, 1px) solid var(--border-color);
		border-right: var(--bwh, 1px) solid var(--border-color);
	}

	div.top__row {
		div.cell:first-child {
			border-top: 1px solid var(--border-color);
		}
	}

	div.left__row {
		div.cell:first-child {
			border-left: 1px solid var(--border-color);
		}
	}
</style>
