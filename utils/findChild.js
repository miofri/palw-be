const PalCombos = require('../models/palCombos/palCombosSchema');

const findChild = async (req) => {
	const parentOne = req.query.palOne;
	const parentTwo = req.query.palTwo;

	const palReference = await PalCombos.find({ Pal: 'None' }).then((result) => {
		const resultToObject = result[0].toObject();
		return Object.keys(resultToObject).find(
			(key) => resultToObject[key] === parentTwo
		);
	});

	const findChild = await PalCombos.find({ Pal: parentOne }).then((result) => {
		const resultToObject = result[0].toObject();
		return resultToObject[palReference];
	});

	return findChild;
};

module.exports = { findChild };
