const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Quote {
    _id: ID!
    quote: String!
    character: String!
    episode: String!
    castMember: CastMember!
    sfw: Boolean!
}

type CastMember {
    _id: ID!
    name: String!
    quotes: [Quote!]
}

input QuoteInput {
    quote: String!
    character: String!
    episode: String!
    castMemberID: ID
    sfw: Boolean!
}

input CastMemberInput {
    name: String!
}

type RootQuery {
    quotes: [Quote!]
}

type RootMutation {
    addQuote(quoteInput: QuoteInput): Quote
    addCastMember(castMemberInput: CastMemberInput): CastMember
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)