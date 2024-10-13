<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		type?: 'button' | 'submit';
		disabled?: boolean;
		variant?: 'primary' | 'secondary';
		size?: 'default' | 'full';
		children?: Snippet;
		onclick?: (e: MouseEvent) => void;
	}

	const {
		variant = 'primary',
		size = 'default',
		children,
		onclick,
		...props
	}: ButtonProps = $props();
</script>

<button
	class={clsx(
		'rounded  border border-slate-700 px-3 py-1.5  text-sm  font-medium transition-colors disabled:pointer-events-none',
		{
			'bg-slate-700 text-white hover:bg-slate-600 disabled:bg-slate-700/60': variant === 'primary',
			'bg-white hover:bg-slate-100 disabled:text-black/60': variant === 'secondary'
		},
		{ 'w-full': size === 'full' }
	)}
	{...props}
	{onclick}>{@render children?.()}</button
>
