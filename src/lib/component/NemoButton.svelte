<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface NemoButtonProps extends Omit<HTMLButtonAttributes, 'oncontentmenu'> {
		variant: number;
		horEnd?: boolean;
		verEnd?: boolean;
	}

	const { variant = 0, horEnd = false, verEnd = false, ...rest }: NemoButtonProps = $props();

	function getBackground() {
		if (variant === 1) {
			return 'rgb(0 0 0)';
		} else if (variant !== 2) {
			return 'transparent';
		}
	}
</script>

<button
	type="button"
	style:background={getBackground()}
	style:--border-bottom-width={verEnd ? '2px' : '1px'}
	style:--border-right-width={horEnd ? '2px' : '1px'}
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

		background: center url($lib/asset/cross.svg);
	}
</style>
