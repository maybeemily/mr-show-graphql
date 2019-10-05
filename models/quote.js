const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    episode: {
        type: Schema.Types.ObjectId,
        ref: 'Episode'
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