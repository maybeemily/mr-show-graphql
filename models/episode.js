const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    episode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Episode', episodeSchema);