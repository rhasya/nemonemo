<script lang="ts">
	const pHor = [...Array(20).keys()].map(() => [1, 2, 3]);
	const pVer = [...Array(20).keys()].map(() => [3, 4, 5]);
	const modeStr = ['Clear', 'Fill', 'X', 'Toggle'];

	let mode: 0 | 1 | 2 | 3 = $state(3);
	let board = $state([...Array(20).keys()].map(() => Array(20).fill(0)));

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

	$effect(() => {
		const saved = localStorage.getItem('board-0');
		if (saved) {
			board = JSON.parse(saved);
		}

		return () => {
			localStorage.setItem('board-0', JSON.stringify(board));
		};
	});
</script>

<h1>SAMPLE</h1>
<div class="grid">
	<div class="blank">
		<button onclick={handleClickMode}>MODE: {modeStr[mode]}</button>
	</div>
	<div class="top">
		{#each pHor as p}
			<div class="top__row">
				<div class="cell">{p[0]}</div>
				<div class="cell">{p[1]}</div>
				<div class="cell">{p[2]}</div>
			</div>
		{/each}
	</div>
	<div class="left">
		{#each pVer as p}
			<div class="left__row">
				<div class="cell">{p[0]}</div>
				<div class="cell">{p[1]}</div>
				<div class="cell">{p[2]}</div>
			</div>
		{/each}
	</div>
	<div class="board">
		{#each board as row, row_idx}
			{#each row as cell, col_idx}
				<button
					class="cell"
					style:background-color={cell === 1 ? 'black' : 'transparent'}
					onclick={handleClick.bind(null, row_idx, col_idx)}
				>
					{#if cell === 2}
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
			grid-template-rows: repeat(20, 1.5rem);
			grid-template-columns: repeat(20, 1.5rem);
		}
	}
	div.cell {
		width: 1.5rem;
		height: 1.5rem;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	button.cell {
		padding: 0;

		border: none;
		border-bottom: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}
</style>
