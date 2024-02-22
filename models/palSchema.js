const mongoose = require('mongoose');

const palSchema = new mongoose.Schema({
	Name: String,
	CodeName: String,
	ZukanIndex: Number,
	Rarity: Number,
	ElementType1: String,
	ElementType2: String,
	CombiRank: Number,
});

palSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
	},
});

const Pals = mongoose.model('pals', palSchema);
module.exports = Pals;
