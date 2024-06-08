<script lang="ts">
	interface Props {
		index: number;
		vertical?: boolean;
		value: number | string;
		hovered?: boolean;
	}
	const { index, vertical = false, value, hovered = false }: Props = $props();

	function getClass() {
		const arr: string[] = ['cell'];
		if (vertical) {
			arr.push('vertical');
		} else {
			arr.push('horizontal');
		}

		if ((index + 1) % 5 === 0) {
			arr.push('fifth');
		}

		if (hovered) {
			arr.push('hover');
		}

		return arr;
	}
</script>

<div class={getClass().join(' ')}>
	{value}
</div>

<style>
	div.cell {
		width: 1.5rem;
		height: 1.5rem;

		display: flex;
		justify-content: center;
		align-items: center;

		border-bottom: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
		font-weight: 500;

		&.horizontal:first-child {
			border-top: 1px solid var(--border-color);
		}

		&.vertical:first-child {
			border-left: 1px solid var(--border-color);
		}

		&.fifth.vertical {
			border-bottom-width: 2px;
		}
		&.fifth.horizontal {
			border-right-width: 2px;
		}
		&.hover {
			background-color: rgb(var(--bg-hover));
		}
	}
</style>
