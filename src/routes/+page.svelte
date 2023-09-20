<script lang="ts">
	import Board from '$lib/Board.svelte';
	import HorizontalProblem from '$lib/HorizontalProblem.svelte';
	import Rows from '$lib/Rows.svelte';
	import { onMount } from 'svelte';

	let inputHeight = 15;
	let inputWidth = 15;
	let showTextArea = false;
	let textAreaMsg = '';

	let game: Game = {
		height: 0,
		width: 0,
		state: [[]],
		horProbSize: 1,
		horProb: [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15]],
		verProbSize: 1,
		verProb: [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15]]
	};

	onMount(() => {
		handleApplyClick();
	});

	function handleApplyClick() {
		game.height = inputHeight;
		game.width = inputWidth;
		game.state = [];
		for (let i = 0; i < game.height; i++) {
			game.state.push([]);
			for (let j = 0; j < game.width; j++) {
				game.state[i].push(0);
			}
		}
	}

	function handleBoxClick(e: MouseEvent, r: number, c: number) {
		if (e.buttons === 1) {
			// fill
			if (game.state[r][c] === 0) {
				game.state[r][c] = 1;
			} else {
				game.state[r][c] = 0;
			}
		} else if (e.buttons === 2) {
			game.state[r][c] = 2;
		}
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
	}

	function handleSaveClick() {
		textAreaMsg = btoa(JSON.stringify(game));
		localStorage.setItem('saveString', textAreaMsg);
		// showTextArea = true;
	}

	function handleLoadClick() {
		let saveString = localStorage.getItem('saveString');
		if (saveString) {
			game = { ...JSON.parse(atob(saveString)) };
		}
	}
</script>

<main>
	<h1>NEMONEMO</h1>
	<div class="mb-4">
		<h4>SIZE</h4>
		<input type="text" size="2" bind:value={inputHeight} />
		X
		<input type="text" size="2" bind:value={inputWidth} />
		<button on:click={handleApplyClick}>Apply</button>
	</div>
	<div class="mb-4">
		<h4>SAVE/LOAD</h4>
		<button on:click={handleSaveClick}>SAVE</button>
		<button on:click={handleLoadClick}>LOAD</button>
		{#if showTextArea}
			<div class="popup">
				<textarea bind:value={textAreaMsg} />
				<button on:click={() => (showTextArea = false)}>OK</button>
			</div>
		{/if}
	</div>
	<Board>
		<!-- Horizontal Problem -->
		<HorizontalProblem {game} />
		<Rows bind:game />
	</Board>
</main>

<style>
	h4 {
		display: inline-block;
		margin: 0 1rem 0 0;
	}
	.mb-4 {
		margin-bottom: 1rem;
	}
</style>
