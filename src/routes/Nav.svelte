<aside>
	<h1><a href="/">NEMONEMO</a></h1>
	<ul>
		<li><a href="/list">List</a></li>
		<li><a href="/showroom">Showroom</a></li>
	</ul>
</aside>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}

	aside {
		background-color: lightgray;
		width: 200px;

		display: flex;
		flex-direction: column;
		align-items: flex-start;

		h1 {
			width: 100%;
			text-align: center;
		}

		ul {
			width: 100%;
			list-style: none;
			padding: 0px 1rem;
			display: flex;
			flex-direction: column;
			li {
				padding: 0.5rem 1rem;
				&:hover {
					background-color: aliceblue;
				}
				a {
					display: inline-block;
					width: 100%;
				}
			}
		}
	}
</style>
