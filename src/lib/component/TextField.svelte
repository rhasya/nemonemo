<script lang="ts">
	interface TextFieldProps {
		type: 'text' | 'password';
		placeholder?: string;
		name?: string;
		value?: string;
	}

	let { value = $bindable(), ...props }: TextFieldProps = $props();
</script>

<input class="rounded border px-1 py-1 outline-none" {...props} bind:value />
