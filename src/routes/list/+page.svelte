<script lang="ts">
	import PageTitle from '$lib/component/PageTitle.svelte';

	const { data } = $props();
</script>

<PageTitle>List</PageTitle>
<table class="w-[500px] table-fixed">
	<thead>
		<tr class="border-b">
			<th class="w-[100px] py-1.5">CODE</th>
			<th class="py-1.5">TITLE</th>
			<th class="w-[100px] py-1.5">SIZE</th>
		</tr>
	</thead>
	<tbody>
		{#each data.problems as problem (problem.id)}
			<tr class="border-b hover:bg-slate-50">
				<td class="px-2 py-1.5 text-center">{problem.code}</td>
				<td class="px-2 py-1.5">
					<a href={`/problem/${problem.id}`}>{problem.title}</a>
				</td>
				<td class="px-2 py-1.5 text-center">{`${problem.height}x${problem.width}`}</td>
			</tr>
		{/each}
	</tbody>
</table>
