<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import service from '$lib/service';
	import Separator from '$lib/component/Separator.svelte';

	let sizeVerInput = $state(20);
	let sizeHorInput = $state(20);

	let sizeVer = $state(0);
	let sizeHor = $state(0);

	let dataVer: string[] = $state([]);
	let dataHor: string[] = $state([]);

	function handleClickApply() {
		sizeVer = sizeVerInput;
		sizeHor = sizeHorInput;

		dataVer = [...Array(sizeVer).fill('')];
		dataHor = [...Array(sizeHor).fill('')];
	}

	function handleSubmit({ formData, cancel }: { formData: FormData; cancel: () => void }) {
		const d = Object.fromEntries(formData);
		const inputData = {
			...d,
			pVer: JSON.stringify(dataVer.map((str) => str.split(',').map((v) => parseInt(v)))),
			pHor: JSON.stringify(dataHor.map((str) => str.split(',').map((v) => parseInt(v)))),
			sizeVer: parseInt(d.sizeVer as string),
			sizeHor: parseInt(d.sizeHor as string),
			difficulty: parseFloat(d.difficulty as string)
		};

		service.saveProblem(inputData as unknown as Problem).then(() => goto('/list'));
		cancel();
	}
</script>

<h1>Make Problem</h1>
<form use:enhance={handleSubmit} method="post">
	<div class="size-wrap">
		<label>
			Vertical Size(↕)
			<input type="number" bind:value={sizeVerInput} max={100} required name="sizeVer" />
		</label>
		<div>
			<button onclick={() => (sizeVerInput += 5)}>+5</button>
			<button onclick={() => (sizeVerInput -= 5)}>-5</button>
		</div>
		<label>
			Horizontal Size(↔)
			<input type="number" bind:value={sizeHorInput} max={100} required name="sizeHor" />
		</label>
		<div>
			<button onclick={() => (sizeHorInput += 5)}>+5</button>
			<button onclick={() => (sizeHorInput -= 5)}>-5</button>
		</div>
		<button type="button" onclick={handleClickApply}>적용</button>
	</div>

	<div class="basic">
		<label>
			Key
			<input type="text" name="key" size={6} required />
		</label>
		<label>
			Difficulty
			<input type="text" name="difficulty" size={6} required />
		</label>
		<label>
			Title
			<input type="text" name="title" size={100} required />
		</label>
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
			<button type="submit">저장</button>
		</div>
	</div>
</form>

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
			width: 4rem;
		}
	}
	div.basic {
		margin-top: 1rem;
		border: 1px solid black;
		padding: 1rem;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
		margin-top: 1rem;
	}
</style>
