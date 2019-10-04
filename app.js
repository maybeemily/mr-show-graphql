const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            quotes: [String!]!
        }

        type RootMutation {
            addQuote(quote: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        quotes: () => {
            return ['A Quote','Cool Quote']
        },
        addQuote: (args) => {
            const quote = args.quote;
            return quote;
        }
    },
    graphiql: true
}))

app.listen(4000);