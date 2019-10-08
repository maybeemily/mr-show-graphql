require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index')


const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
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

// type Character {
//     _id: ID!
//     name: String!
//     castMember: CastMember!
//     quotes: [Quote!]
//     episodes: [Episode]
// }

// type CastMember {
//     _id: ID!
//     name: String!
//     characters: [Character]
//     quotes: [Quote]
// }

// type Episode {
//     _id: ID!
//     episode: String!
// }