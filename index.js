const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const palRouter = require('./controllers/palRouter');
require('dotenv').config();
const url = process.env.MONGODB_URI;
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

mongoose
	.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});
mongoose.set('strictQuery', false);
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

app.get('/', (req, res) => {
	res.redirect('/api/pal');
});
app.use('/api/pal', palRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
