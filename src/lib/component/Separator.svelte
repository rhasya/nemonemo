<script lang="ts">
	const { vertical = false } = $props();
</script>

<div
	class="separator"
	style:width={!vertical ? '100%' : '1px'}
	style:height={vertical ? '100%' : '1px'}
></div>

<style>
	div.separator {
		background-color: black;
	}
</style>
