<script lang="ts">
	const { data } = $props();
	const id = $derived(data.id);

	const modeStr = ['Clear', 'Fill', 'X', 'Toggle'];
	const initData = [...Array(data.sizeVer).keys()].map(() => Array(data.sizeHor).fill(0));

	let mode: 0 | 1 | 2 | 3 = $state(3);
	let board = $state([...initData]);
	let hideX = $state(false);

	function handleClick(row_idx: number, col_idx: number) {
		if (mode === 3) {
			if (board[row_idx][col_idx] === 1) {
				board[row_idx][col_idx] = 0;
			} else {
				board[row_idx][col_idx] = 1;
			}
		} else {
			board[row_idx][col_idx] = mode;
		}
	}

	function handleRightClick(row_idx: number, col_idx: number, e: MouseEvent) {
		e.preventDefault();
		if (mode === 3) {
			if (board[row_idx][col_idx] === 2) {
				board[row_idx][col_idx] = 0;
			} else {
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
				<button
					class="cell"
					style:background-color={cell === 1 ? 'black' : 'transparent'}
					style:--bwv={(row_idx + 1) % 5 === 0 ? '2px' : '1px'}
					style:--bwh={(col_idx + 1) % 5 === 0 ? '2px' : '1px'}
					onclick={handleClick.bind(null, row_idx, col_idx)}
					oncontextmenu={handleRightClick.bind(null, row_idx, col_idx)}
				>
					{#if cell === 2 && !hideX}
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
							<path d="M 0 0 L 24 24 M 0 24 L 24 0 Z" stroke="gray" />
						</svg>
					{:else}
						{''}
					{/if}
				</button>
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

	button.cell {
		padding: 0;
		outline: none;

		border: none;
		border-bottom: var(--bwv) solid var(--border-color);
		border-right: var(--bwh) solid var(--border-color);
	}
</style>
