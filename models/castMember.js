const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const castMemberSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        characters: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Character'
        }
    ],
        episode: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Episode'
        }
    ],
        quotes: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Quote'

        }]
});

module.exports = mongoose.model('CastMember', castMemberSchema);