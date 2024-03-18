const express = require('express');
const palRouter = require('express').Router();
const path = require('path');
const Pals = require('../models/palSchema');
const PalCombos = require('../models/palCombos/palCombosSchema');
const palProjection = require('../models/allPals/palProjection');

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

palRouter.post('/palcombos/', (req, res) => {
	const requestedPal = req.body.palName;
	const foundPal = [];
	PalCombos.find({}).then((docs) => {
		const foundPal = docs.filter((element) => {
			for (const key in element) {
				if (element[key] === requestedPal) {
					return true;
				}
			}
			return false;
		});
		const filteredPal = [];
		foundPal.filter((doc) => {
			for (const key in doc) {
				if (doc[key] === requestedPal) {
					filteredPal.push({ [key]: doc[key], Pal: doc.Pal });
				}
			}
		});

		console.log(filteredPal);
		res.json(filteredPal);
	});
});

module.exports = palRouter;
