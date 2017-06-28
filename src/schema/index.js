const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Define your types here.
const typeDefs = `
  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link

    # Note that this mutation could receive the email and password directly
    # as arguments, with no problem. You're just using this "authProvider"
    # instead to mimic the signature generated by Graphcool, which will
    # make it easier to integrate this new server later with the frontend
    # code from previous tutorials.
    createUser(name: String!, authProvider: AuthProviderSignupData!): User

    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String
    password: String
  }

  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  type SigninPayload {
    token: String
    user: User
  }

  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});
