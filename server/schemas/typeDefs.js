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

  input CharityUpdateInput {
    _id: ID!
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

  input CommentInput {
    message: String!
    donorName: String!
    donorPhone: String!
    donorEmail: String!
  }

  type Comment {
    _id: ID!
    message: String!
    donorName: String!
    donorPhone: String!
    donorEmail: String!
  }

  type Request {
    _id: ID!
    requestTitle: String
    requestDescription: String
    neededDate: String
    isFulfilled: String
    comments: [Comment]
    charity_ID: String
    createdAt: String!
  }

  type Search {
    _id: ID!
    charityName: String
    city: String
    state: String
    zipCode: String
    email: String
    requestTitle: String
    requestDescription: String
    neededDate: String
    createdAt: String!
  }

  type Query {
    charities(owner_ID: String): [Charity]
    requests(charity_ID: String): [Request]
    charity(_id: ID!): Charity
    search: Search
    user: User
  }

  type Mutation {
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addCharity(charityData: CharityInput!): Charity
    addRequest(requestTitle: String!, requestDescription: String!, neededDate: String, isFulfilled: Boolean!, comments: [CommentInput], charity_ID: String!): Request
    editCharity(charityData: CharityUpdateInput!): Charity
    setRequestCompleteStatus(_id: ID!, isFulfilled: Boolean!): Request
    deleteCharity(_id: ID!): Charity
    deleteRequest(_id: ID!): Request
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
