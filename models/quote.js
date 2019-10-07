const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    character: {
        type: String
    },
    episode: {
        type: String
    },
    castMember: {
        type: Schema.Types.ObjectId,
        ref: 'CastMember'
    },
    sfw: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Quote', quoteSchema);