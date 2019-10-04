require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const quotes = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Quote {
            _id: ID!
            quote: String!
            sfw: Boolean!
        }

        input QuoteInput {
            quote: String!
            sfw: Boolean!
        }

        type RootQuery {
            quotes: [Quote!]!
        }

        type RootMutation {
            addQuote(quoteInput: QuoteInput): Quote
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        quotes: () => {
            return quotes;
        },
        addQuote: args => {
            const quote = {
                _id: Math.random().toString(),
                quote: args.quoteInput.quote,
                sfw: args.quoteInput.sfw
            }
            quotes.push(quote);
            return quote;
        }
    },
    graphiql: true
}))

mongoose.connect(
    `mongodb://${process.env.MONGODB_URI}`)
.then(() => {
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});

