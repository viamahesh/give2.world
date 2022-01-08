const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Charity {
    _id: ID!
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
    charities(owner_ID: String): [Charity]
    charity(_id: ID!): Charity
    user: User
  }

  type Mutation {
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addCharity(charityData: CharityInput!): Charity
    editCharity(_id: ID!, charityData: CharityInput!): Charity
    deleteCharity(_id: ID!): Charity
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
