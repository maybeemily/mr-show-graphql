const Quote = require('../../models/quote');
const CastMember = require('../../models/castMember')

const findCastMember = async castMemberId => {
    try {
        const castMember = await CastMember.findById(castMemberId);
        return { ...castMember, _id: castMember.id, quotes: quotes };
    }
    catch (err) {
        throw err;
    } 
}


module.exports = {
quotes: () => {
    return Quote.find()
    .populate('castMember')
    .then(quotes => {
        return quotes.map(quote => {
            return{
                ...quote,
                _id: quote.id,
                castMember: {

                }
            };
        })
    })
    .catch(err => {
        throw err;
    })
    ;
},
addQuote: async args => {
    const quote = new Quote({
        quote: args.quoteInput.quote,
        sfw: args.quoteInput.sfw,
        castMember: findCastMember(args.quoteInput.castMember)
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