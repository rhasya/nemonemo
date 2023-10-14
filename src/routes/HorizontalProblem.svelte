<script lang="ts">
	export let game: Game;
	export let active: { r: number; c: number };

	function ver(i: number) {
		return i % 5 === 0 ? 'ver-line' : '';
	}
</script>

<!-- spacing -->
{#each { length: game.horProbSize ?? 0 } as _, j (j)}
	<tr>
		{#each { length: game.verProbSize ?? 0 } as _, i (i)}
			<td class="box null" />
		{/each}
		{#each { length: game.width } as _, i (i)}
			<th class="box {ver(i)}" class:active={active.c === i}>
				<div>{game.horProb?.[i]?.[j] || ''}</div>
			</th>
		{/each}
	</tr>
{/each}

<style>
	.active {
		background-color: aqua;
	}
</style>
