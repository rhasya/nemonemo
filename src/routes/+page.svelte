<script lang="ts">
	import { onMount } from 'svelte';

	interface Game {
		height: number;
		width: number;
		state: number[][];
		mode: number;
	}

	let inputHeight = 15;
	let inputWidth = 15;
	let showTextArea = false;
	let textAreaMsg = '';

	let game: Game = {
		height: 0,
		width: 0,
		state: [[]],
		mode: 0
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
			if (game.mode === 0) {
				// fill
				if (game.state[r][c] === 0) {
					game.state[r][c] = 1;
				} else {
					game.state[r][c] = 0;
				}
			} else {
				if (game.state[r][c] === 0) {
					game.state[r][c] = 2;
				} else {
					game.state[r][c] = 0;
				}
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

<h1>NEMONEMO</h1>
<div class="mb-4">
	<h4>SIZE</h4>
	<input type="text" size="2" bind:value={inputHeight} />
	X
	<input type="text" size="2" bind:value={inputWidth} />
	<button on:click={handleApplyClick}>Apply</button>
</div>
<div class="mb-4">
	<h4>MOUSE MODE</h4>
	<input type="radio" id="fill" value={0} bind:group={game.mode} />
	<label for="fill">FILL</label>
	<input type="radio" id="cross" value={1} bind:group={game.mode} />
	<label for="cross">CROSS</label>
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
<div class="row-wrapper">
	{#each { length: game.height } as _, r}
		{#if r % 5 == 0}
			<div class="ver-border" style:width={`${game.width * 30 + 7}px`} />
		{/if}
		<div class="col-wrapper">
			{#each { length: game.width } as _, c}
				{#if c % 5 == 0}
					<div class="hor-border" />
				{/if}
				{#if game.state[r][c] === 0}
					<div
						class="box"
						on:mousedown={(e) => handleBoxClick(e, r, c)}
						tabindex="-1"
						role="cell"
						on:contextmenu={handleContextMenu}
					/>
				{:else if game.state[r][c] === 1}
					<div
						class="box black"
						on:mousedown={(e) => handleBoxClick(e, r, c)}
						tabindex="-1"
						role="cell"
						on:contextmenu={handleContextMenu}
					/>
				{:else}
					<div
						class="box center"
						on:mousedown={(e) => handleBoxClick(e, r, c)}
						tabindex="-1"
						role="cell"
						on:contextmenu={handleContextMenu}
					>
						<svg style:width="100%" style:height="100%">
							<polyline
								points="0,0 30,30 0,30 30,0"
								fill="none"
								stroke="#AAAAAA"
								stroke-width="2"
							/>
						</svg>
					</div>
				{/if}
			{/each}
			<div class="hor-border" />
		</div>
	{/each}
	<div class="ver-border" style:width={`${game.width * 30 + 7}px`} />
</div>

<style>
	h4 {
		display: inline-block;
		margin: 0 1rem 0 0;
	}
	.mb-4 {
		margin-bottom: 1rem;
	}
	.row-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.col-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.box {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		width: 30px;
		height: 30px;
	}
	.box.black {
		background-color: #333333;
	}
	.ver-border {
		height: 2px;
		border-bottom: 2px solid black;
	}
	.hor-border {
		width: 2px;
		height: 30px;
		border-right: 2px solid black;
	}
	.popup {
		padding: 4px;
	}
	.popup textarea {
		resize: none;
	}
</style>
