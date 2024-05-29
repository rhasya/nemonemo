<script lang="ts">
	import Board from '../Board.svelte';
	import { encodeJson, decodeJsonStr } from '$lib/jsonUtil';
	import { onMount } from 'svelte';

	let inputHeight = 15;
	let inputWidth = 15;
	let showTextArea = false;
	let textAreaMsg = '';
	let showXMark = true;
	let encodedProblem = '';
	let game: Game = {
		height: 0,
		width: 0,
		state: [[]]
	};

	onMount(() => {
		handleApplyClick();
	});

	function initBoard() {
		const state: number[][] = [];
		for (let i = 0; i < game.height; i++) {
			state.push([]);
			for (let j = 0; j < game.width; j++) {
				state[i].push(0);
			}
		}
		game.state = [...state];
	}

	function processData(data: {
		width: number;
		height: number;
		verProbSize?: number;
		verProb?: number[][];
		horProbSize?: number;
		horProb?: number[][];
	}) {
		if (data.verProbSize && data.verProb) {
			for (let i = 0; i < data.height; i++) {
				const appArr = Array(data.verProbSize - data.verProb[i].length).map((_) => 0);
				data.verProb[i].splice(0, 0, ...appArr);
			}
		}

		if (data.horProbSize && data.horProb) {
			for (let i = 0; i < data.width; i++) {
				const appArr = Array(data.horProbSize - data.horProb[i].length).map((_) => 0);
				data.horProb[i].splice(0, 0, ...appArr);
			}
		}
	}

	function handleApplyClick() {
		game = {
			height: inputHeight,
			width: inputWidth,
			state: [[]]
		};

		initBoard();
	}

	function handleSaveClick() {
		textAreaMsg = encodeJson(game);
		localStorage.setItem('saveString', textAreaMsg);
	}

	function handleLoadClick() {
		let saveString = localStorage.getItem('saveString');
		if (saveString) {
			game = { ...decodeJsonStr(saveString) };
		}
	}

	async function handleProb1Click() {
		const { default: data } = await import(`$lib/prob/Prob8.json`);
		processData(data);
		game = { state: [[]], ...data };
		inputWidth = data.width;
		inputHeight = data.height;
		initBoard();
	}

	function handleDPClick() {
		const data = decodeJsonStr(encodedProblem);
		processData(data);
		game = { state: [[]], ...data };
		inputWidth = data.width;
		inputHeight = data.height;
		initBoard();
		encodedProblem = '';
	}
</script>

<h1>NEMONEMO</h1>
<div class="option-row">
	<h4>SIZE</h4>
	<input type="number" min={1} max={99} maxlength={2} bind:value={inputHeight} />
	X
	<input type="number" min={1} max={99} maxlength={2} bind:value={inputWidth} />
	<button on:click={handleApplyClick}>Apply</button>
	<div class="w-2" />
	<h4>SAVE/LOAD</h4>
	<button on:click={handleSaveClick}>SAVE</button>
	<button on:click={handleLoadClick}>LOAD</button>
	{#if showTextArea}
		<div class="popup">
			<textarea bind:value={textAreaMsg} />
			<button on:click={() => (showTextArea = false)}>OK</button>
		</div>
	{/if}
	<h4>DISPLAY</h4>
	<button on:click={() => (showXMark = !showXMark)}>{`${showXMark ? 'HIDE' : 'SHOW'} X`}</button>
</div>
<div class="option-row">
	<h4>PROBLEM</h4>
	<button on:click={handleProb1Click}>P</button>
	<textarea bind:value={encodedProblem} />
	<button on:click={handleDPClick}>Decode</button>
</div>
<div>
	<Board bind:game {showXMark} />
</div>

<style>
	h4 {
		margin-top: 0;
		margin-bottom: 0;
	}
	.option-row {
		display: flex;
		flex-direction: row;
		gap: 4px;
		margin-bottom: 1rem;
	}
</style>
