<script lang="ts">
	export let game: Game;

	function ver(i: number) {
		return i % 5 === 0 ? 'ver-line' : '';
	}
	function hor(i: number) {
		return i % 5 === 0 ? 'hor-line' : '';
	}
	function state(r: number, c: number) {
		if (game.state?.[r]?.[c] === 1) {
			return 'fill';
		}
		return '';
	}

	function handleMousedown(e: MouseEvent) {
		const elem = e.currentTarget as HTMLDivElement;
		const r = elem.dataset['row'];
		const c = elem.dataset['col'];
		if (r && c) {
			if (e.buttons === 1) {
				if (game.state[parseInt(r)][parseInt(c)] === 0) {
					game.state[parseInt(r)][parseInt(c)] = 1;
				} else {
					game.state[parseInt(r)][parseInt(c)] = 0;
				}
			} else if (e.buttons === 2) {
				game.state[parseInt(r)][parseInt(c)] = 2;
			}
		}
	}
</script>

{#each { length: game.height } as _, r (r)}
	<tr>
		{#each { length: game.verProbSize ?? 0 } as _, c (c)}
			<th class="box {hor(r)}"><div>{game.verProb?.[r]?.[c] ?? ''}</div></th>
		{/each}
		{#each { length: game.width } as _, c (c)}
			<td class="box {hor(r)} {ver(c)} {state(r, c)}">
				<div
					on:mousedown={handleMousedown}
					on:contextmenu|preventDefault={() => {}}
					data-row={r}
					data-col={c}
					role="button"
					tabindex="-1"
				>
					{#if game.state[r]?.[c] === 2}
						<svg>
							<polyline points="0,0 32,32" fill="none" stroke-width="2" stroke="#CCCCCC" />
							<polyline points="0,32 32,0" fill="none" stroke-width="2" stroke="#CCCCCC" />
						</svg>
					{/if}
				</div>
			</td>
		{/each}
	</tr>
{/each}

<style>
	td svg {
		width: 100%;
		height: 100%;
	}
</style>
