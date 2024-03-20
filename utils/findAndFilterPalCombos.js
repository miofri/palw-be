function findAndFilterPalCombos(docs, requestedPal) {
	const indexReference = docs.filter((element) => {
		return element.Search === 0;
	});
	const filteredPal = [];
	docs.filter((doc) => {
		for (const key in doc) {
			if (doc[key] === requestedPal && doc.Pal !== 'None') {
				filteredPal.push({ [key]: doc[key], Pal: doc.Pal });
			}
		}
	});

	const groupedByPal = {};
	filteredPal.forEach((doc) => {
		const { Pal, ...rest } = doc;
		if (!groupedByPal[Pal]) {
			groupedByPal[Pal] = { pair: [] };
		}
		for (const key in rest) {
			groupedByPal[Pal].pair.push(indexReference[0][key]);
		}
	});

	const resultArray = Object.keys(groupedByPal).map((key) => ({
		pal: key,
		pair: groupedByPal[key].pair,
	}));
	return resultArray;
}
module.exports = { findAndFilterPalCombos };
