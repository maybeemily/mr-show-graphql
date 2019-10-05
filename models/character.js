const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    castMember: {
        type: Schema.Types.ObjectId,
        ref: 'CastMember'
    },
    quotes: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Quote'
        }
    ]
    
});

module.exports = mongoose.model('Character', characterSchema);