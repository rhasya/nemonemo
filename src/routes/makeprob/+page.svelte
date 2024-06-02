<script lang="ts">
	import Separator from '$lib/component/Separator.svelte';

	let sizeVerInput = $state(20);
	let sizeHorInput = $state(20);

	let sizeVer = $state(0);
	let sizeHor = $state(0);

	let dataVer: string[] = $state([]);
	let dataHor: string[] = $state([]);

	let pVer = $state('');
	let pHor = $state('');

	function handleClickApply() {
		sizeVer = sizeVerInput;
		sizeHor = sizeHorInput;

		dataVer = [...Array(sizeVer).fill('')];
		dataHor = [...Array(sizeHor).fill('')];
	}

	function handleClickCreate() {
		pVer = JSON.stringify(dataVer.map((str) => str.split(',').map((v) => parseInt(v))));
		pHor = JSON.stringify(dataHor.map((str) => str.split(',').map((v) => parseInt(v))));
	}
</script>

<h1>Make Problem</h1>
<div class="size-wrap">
	<label>
		세로크기(↕)
		<input type="number" value={sizeVerInput} />
	</label>
	<div>
		<button onclick={() => (sizeVerInput += 5)}>+5</button>
		<button onclick={() => (sizeVerInput -= 5)}>-5</button>
	</div>
	<label>
		가로크기(↔)
		<input type="number" value={sizeHorInput} />
	</label>
	<div>
		<button onclick={() => (sizeHorInput += 5)}>+5</button>
		<button onclick={() => (sizeHorInput -= 5)}>-5</button>
	</div>
	<button onclick={handleClickApply}>적용</button>
</div>

<div class="input">
	<div class="ver">
		<h2>문제 (↓)</h2>
		{#each Array(sizeVer).keys() as key}
			<label>
				{key + 1}
				<input type="text" bind:value={dataVer[key]} />
			</label>
			{#if (key + 1) % 5 === 0}
				<Separator />
			{/if}
		{/each}
	</div>
	<div class="hor">
		<h2>문제 (→)</h2>
		{#each Array(sizeHor).keys() as key}
			<label>
				{key + 1}
				<input type="text" bind:value={dataHor[key]} />
			</label>
			{#if (key + 1) % 5 === 0}
				<Separator />
			{/if}
		{/each}
	</div>
</div>
<div class="result">
	<div>
		<button onclick={handleClickCreate}>생성</button>
	</div>
	<label>
		<span>pHor</span>
		<input type="text" value={pHor} readonly />
	</label>
	<label>
		<span>pVer</span>
		<input type="text" value={pVer} readonly />
	</label>
</div>

<style>
	div.size-wrap {
		width: 100%;

		border: 1px solid gray;

		padding: 1rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;

		input[type='number'] {
			width: 100px;
		}
	}
	div.input {
		display: flex;
		gap: 1rem;

		div.ver,
		div.hor {
			display: flex;
			flex-direction: column;
			gap: 4px;

			flex-basis: 280px;

			label {
				text-align: right;
				padding: 0 1rem;
			}
		}
	}
	div.result {
		display: flex;
		flex-direction: column;
		gap: 4px;

		label {
			span {
				display: inline-block;
				width: 3rem;
				text-align: right;
			}
			input {
				width: 30rem;
			}
		}
	}
</style>
