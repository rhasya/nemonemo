<script lang="ts">
	let width = 20;
	let height = 20;
	let horProbArr = Array<string>(20);
	let verProbArr = Array<string>(20);
	let text = '';

	function handleApplyClick() {
		horProbArr = Array<string>(width);
		verProbArr = Array<string>(height);
	}
	function handleMakeClick() {
		const horProb = horProbArr.map((line) => line.split(',').map((v) => parseInt(v)));
		const verProb = verProbArr.map((line) => line.split(',').map((v) => parseInt(v)));

		const horProbSize = horProb.reduce((prev, cur) => (prev >= cur.length ? prev : cur.length), 0);
		const verProbSize = verProb.reduce((prev, cur) => (prev >= cur.length ? prev : cur.length), 0);

		const j = {
			width,
			height,
			horProbSize,
			horProb,
			verProbSize,
			verProb
		};
		text = JSON.stringify(j);
	}
</script>

<h1>Make Problem</h1>
<div>
	<h2>Size</h2>
	<div>
		<label for="width">Width</label>
		<input type="number" bind:value={width} id="width" maxlength={2} min={1} max={99} />
		<span>x</span>
		<label for="height">Height</label>
		<input type="number" bind:value={height} id="height" maxlength={2} min={1} max={99} />
		<button on:click={handleApplyClick}>Apply</button>
	</div>
	<div class="container">
		<div class="hor">
			<h2>Horizontal Problem (Left to Right)</h2>
			<div class="prob-container">
				{#each horProbArr as _, i (i)}
					<div class="prob-line">
						<label for="">{i + 1}</label>
						<input placeholder="" bind:value={horProbArr[i]} />
					</div>
				{/each}
			</div>
		</div>
		<div class="ver">
			<h2>Vertical Problem (Top to Buttom)</h2>
			<div>
				{#each verProbArr as _, i (i)}
					<div class="prob-line">
						<label for="">{i + 1}</label>
						<input placeholder="" bind:value={verProbArr[i]} />
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div>
		<button on:click={handleMakeClick}>Make</button>
	</div>
	<div>
		<textarea bind:value={text} />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}
	.hor {
		flex-grow: 1;
	}
	.ver {
		flex-grow: 1;
	}
	.prob-container {
		display: flex;
		flex-direction: column;
	}
	.prob-line {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 4px;
	}
	.prob-line label {
		width: 24px;
		text-align: right;
	}
</style>
