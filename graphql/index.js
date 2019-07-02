const express = require('express');
const expressGraphql = require('express-graphql');
const Graphql = require('graphql');

const app = express();

const geoType = new Graphql.GraphQLObjectType({
  name: 'geo',
  fields: {
    lat: { type: Graphql.GraphQLFloat },
    lng: { type: Graphql.GraphQLFloat }
  }
});

const companyType = new Graphql.GraphQLObjectType({
  name: 'company',
  fields: {
    name: { type: Graphql.GraphQLString },
    catchPhrase: { type: Graphql.GraphQLString },
    bs: { type: Graphql.GraphQLString }
  }
});

const addressType = new Graphql.GraphQLObjectType({
  name: 'address',
  fields: {
    street: { type: Graphql.GraphQLString },
    suite: { type: Graphql.GraphQLString },
    city: { type: Graphql.GraphQLString },
    zipcode: { type: Graphql.GraphQLString },
    geo: { type: geoType }
  }
});

const userType = new Graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: Graphql.GraphQLInt },
    name: { type: Graphql.GraphQLString },
    username: { type: Graphql.GraphQLString },
    email: { type: Graphql.GraphQLString },
    address: { type: addressType },
    phone: { type: Graphql.GraphQLString },
    website: { type: Graphql.GraphQLString },
    company: { type: companyType }
  }
});

app.use(
  '/graphql',
  expressGraphql({
    graphiql: true
  })
);

app.listen(8080);

console.log('Running graphql server');
