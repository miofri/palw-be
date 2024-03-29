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

module.exports = palRouter;
