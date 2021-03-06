const clarifai = require('clarifai');

const app = new clarifai.App({ apiKey: process.env.API_clarifai });

const handleApiCall = (req, res) => {
    app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
            res.json(data);
        })
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        }).catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall
}