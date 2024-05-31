<h1>List</h1>
<table>
	<thead>
		<tr>
			<th class="id">ID</th>
			<th class="title">Title</th>
			<th class="size">Size</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="id">1</td>
			<td class="title"><a href="/problem/1">SAMPLE</a></td>
			<td class="size">5x5</td>
		</tr>
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
			&.id {
				width: 100px;
			}
			&.size {
				width: 300px;
			}
		}
		td {
			&.id {
				width: 100px;
				text-align: right;
			}
			&.size {
				width: 300px;
				text-align: center;
			}
		}
	}
</style>
