export async function load({ params }) {
	const pHorStr =
		'[[15],[5,5],[3,3],[4,4],[2,7,2],[1,1],[1,1],[1,1],[1,1],[1,1],[2,7,2],[4,4],[3,3],[5,5],[15]]';
	const pVerStr =
		'[[15],[5,5],[4,4],[2,1,1,2],[2,1,1,2],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[2,1,1,2],[2,1,1,2],[4,4],[5,5],[15]]';
	return {
		id: params.id,
		sizeHor: 15,
		sizeVer: 15,
		pHor: JSON.parse(pHorStr),
		pVer: JSON.parse(pVerStr)
	};
}
