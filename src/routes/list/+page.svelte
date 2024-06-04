<script lang="ts">
	const { data } = $props();
</script>

<h1>List</h1>
<table>
	<thead>
		<tr>
			<th class="key">Key</th>
			<th class="title">Title</th>
			<th class="size">Size</th>
			<th class="difficulty">Difficulty</th>
		</tr>
	</thead>
	<tbody>
		{#each data.list as prob (prob.id)}
			<tr>
				<td class="key">{prob.key}</td>
				<td class="title"><a href="/problem/{prob.id}">{prob.title}</a></td>
				<td class="size">{prob.sizeVer}x{prob.sizeHor}</td>
				<td class="difficulty">{prob.difficulty}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;

		tr {
			border-top: 1px solid gray;
			border-bottom: 1px solid gray;
			height: 2rem;
		}

		th,
		td {
			padding: 0 1rem;
		}
		th {
			&.key {
				width: 100px;
			}
			&.size {
				width: 300px;
			}
			&.difficulty {
				width: 100px;
			}
		}
		td {
			&.key {
				width: 100px;
				text-align: center;
			}
			&.size {
				width: 300px;
				text-align: center;
			}
			&.difficulty {
				width: 100px;
				text-align: center;
			}
		}
	}
</style>
