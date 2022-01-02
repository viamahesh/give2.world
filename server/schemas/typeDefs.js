const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Charity {
    charityName: String
    missionStatement: String
    charityType: String
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
    contactPerson: String
    email: String
    phone: String
    website: String
    owner_ID: String
  }

  input CharityInput {
    charityName: String!
    missionStatement: String
    charityType: String
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
    contactPerson: String
    email: String
    phone: String
    website: String
    owner_ID: String
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    charities(name: String): [Charity]
    charity(_id: ID!): Charity
    user: User
  }

  type Mutation {
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addCharity(charityData: CharityInput!): Charity
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
