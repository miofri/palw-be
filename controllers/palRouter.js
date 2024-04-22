const express = require('express');
const palRouter = require('express').Router();
const path = require('path');
const Pals = require('../models/palSchema');
const PalCombos = require('../models/palCombos/palCombosSchema');
const palProjection = require('../models/allPals/palProjection');
const { findAndFilterPalCombos } = require('../utils/findAndFilterPalCombos');

const palImagePath = path.join(__dirname, '..', 'assets', 'palIcons');
const palWorkIconsPath = path.join(__dirname, '..', 'assets', 'palWorkIcons');
palRouter.use('/palicons', express.static(palImagePath));
palRouter.use('/palworkicons', express.static(palWorkIconsPath));

palRouter.get('/', (req, res) => {
	Pals.find({}, palProjection).then((pals) => {
		res.json(pals);
	});
});

palRouter.get('/palcombos', (req, res) => {
	PalCombos.find({}).then((pals) => {
		res.json(pals);
	});
});

palRouter.get('/palcombos/:palname', (req, res) => {
	const requestedPal = req.params.palname;
	console.log(requestedPal);

	PalCombos.find({}).then((docs) => {
		const resultArray = findAndFilterPalCombos(docs, requestedPal);
		res.json(resultArray);
	});
});

palRouter.get('/findbyparents', async (req, res) => {
	const parentOne = req.query.palOne;
	const parentTwo = req.query.palTwo;

	const palReference = await PalCombos.find({ Pal: 'None' })
		.exec()
		.then((result) => {
			const resultToObject = result[0].toObject();
			return Object.keys(resultToObject).find(
				(key) => resultToObject[key] === parentTwo
			);
		});

	PalCombos.find({ Pal: parentOne }).then((result) => {
		const resultToObject = result[0].toObject();
		console.log(palReference, resultToObject[palReference]);
	});
	res.send(200);
});

module.exports = palRouter;
