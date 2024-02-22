const express = require('express');
const palRouter = require('express').Router();
const path = require('path');
const Pals = require('../models/palSchema');
const palProjection = require('../models/palProjection');

const palImagePath = path.join(__dirname, '..', 'assets', 'palIcons');
const palWorkIconsPath = path.join(__dirname, '..', 'assets', 'palWorkIcons');
palRouter.use('/palicons', express.static(palImagePath));
palRouter.use('/palworkicons', express.static(palWorkIconsPath));

palRouter.get('/', (req, res) => {
	Pals.find({}, palProjection).then((pals) => {
		res.json(pals);
	});
});

module.exports = palRouter;
