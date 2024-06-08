<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface NemoButtonProps extends Omit<HTMLButtonAttributes, 'oncontentmenu'> {
		variant: number;
		hideX: boolean;
		horEnd?: boolean;
		verEnd?: boolean;
		hovered?: boolean;
	}

	const {
		variant = 0,
		hideX,
		horEnd = false,
		verEnd = false,
		hovered = false,
		...rest
	}: NemoButtonProps = $props();

	function getBackgroundClass() {
		const arr: string[] = [];

		if (variant === 0) {
			arr.push('empty');
		} else if (variant === 1) {
			arr.push('fill');
		} else if (variant === 2) {
			arr.push('cross');
		}

		if (hovered) {
			arr.push('hover');
		}

		return arr;
	}
</script>

<button
	type="button"
	style:--border-bottom-width={verEnd ? '2px' : '1px'}
	style:--border-right-width={horEnd ? '2px' : '1px'}
	class={getBackgroundClass().join(' ')}
	oncontextmenu={(e) => e.preventDefault()}
	{...rest}
>
</button>

<style>
	button {
		padding: 0;
		outline: 0;

		border: none;
		border-bottom: var(--border-bottom-width) solid var(--border-color);
		border-right: var(--border-right-width) solid var(--border-color);

		background-color: transparent;

		&.empty {
			background-color: rgb(255 255 255);
		}
		&.empty.hover {
			background-color: rgb(var(--bg-hover));
		}
		&.fill {
			background-color: rgb(0 0 0);
		}
		&.cross {
			background-image: url($lib/asset/cross.svg);
		}
		&.cross.hover {
			background-color: rgb(var(--bg-hover));
		}
	}
</style>
