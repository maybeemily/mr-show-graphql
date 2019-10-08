const Quote = require('../../models/quote');
const CastMember = require('../../models/castMember')

const singleCastMember = async castMemberId => {
    try {
        const castMember = await CastMember.findById(castMemberId);
        return {
            ...castMember,
            _id: castMember.id,
            name: castMember.name
        }
    } 
    catch (err) {
        throw err;
    }
}

module.exports = {
quotes: async () => {
    try {
            const quotes = await Quote.find()
                .populate('castMember');
            return quotes.map(quote => {
                return {
                    ...quote._doc,
                    _id: quote.id,
                    castMember: singleCastMember.bind(this, quote.castMember)
                };
            });
        }
        catch (err) {
            throw err;
        }
},
addQuote: async args => {
    const fetchedCastMember = await CastMember.findOne({_id: args.quoteInput.castMemberID})
    const quote = new Quote({
        quote: args.quoteInput.quote,
        character: args.quoteInput.character,
        episode: args.quoteInput.episode,
        castMember: fetchedCastMember,
        sfw: args.quoteInput.sfw,

    });
    try {
        const result = await quote.save();
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
},
addCastMember: async args => {
    const castMember = new CastMember({
        name: args.castMemberInput.name,
    });
    try {
        const result = await castMember.save();
        console.log(result);
        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
}