require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Quote = require('./models/quote');

const app = express();

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
            return Quote.find()
            .then(quotes => {
                return quotes.map(quote => {
                    return{...quote._doc };
                })
            })
            .catch(err => {
                throw err;
            })
            ;
        },
        addQuote: args => {
            const quote = new Quote({
                quote: args.quoteInput.quote,
                sfw: args.quoteInput.sfw
            });
            return quote
            .save()
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
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

