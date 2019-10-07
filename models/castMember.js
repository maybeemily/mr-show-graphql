const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const castMemberSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        quotes: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Quote'

        }]
});

module.exports = mongoose.model('CastMember', castMemberSchema);