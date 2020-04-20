
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: ''
});

const handleApiCall = (req, res) => {
app.models
	.predict('', 
      req.body.input)
	.then(data => {
			res.json(data);
		})
	.catch(err => res.status(400).json('Unable to connect to API'))
}

const loadImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	loadImage: loadImage,
	handleApiCall: handleApiCall
}