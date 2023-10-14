<script lang="ts">
	import HorizontalProblem from './HorizontalProblem.svelte';
	import Rows from './Rows.svelte';

	export let game: Game;
	export let showXMark: boolean;

	let active = { r: -1, c: -1 };

	function handlePointerout() {
		active.r = -1;
		active.c = -1;
	}
</script>

<table on:pointerout={handlePointerout}>
	<!-- Horizontal Problem -->
	<HorizontalProblem {game} {active} />
	<Rows bind:game {showXMark} bind:active />
</table>

<style>
</style>
