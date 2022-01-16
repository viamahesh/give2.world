const { AuthenticationError } = require('apollo-server-express');
const { User, Charity, Request } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    charities: async (parent, { owner_ID }) => {
      let params = {};
      if (owner_ID) {
        params = {
          owner_ID
        };
      }
      return await Charity.find(params);
    },
    requests: async (parent, { charity_ID }) => {
      let params = {};
      if (charity_ID) {
        params = {
          charity_ID
        };
      }
      return await Request.find(params);
    },
    charity: async (parent, { _id }) => {
      return await Charity.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    signUp: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addCharity: async (_, args) => {
      const res = await Charity.create(args.charityData);
      return res;
    },
    addRequest: async (_, args) => {
      const res = await Request.create(args);
      return res;
    },
    editCharity: async (_, args) => {
      return await Charity.findByIdAndUpdate(args.charityData._id, args.charityData, { new: true });
    },
    setRequestCompleteStatus: async (_, args) => {
      return await Request.findByIdAndUpdate(args._id, { isFulfilled: args.isFulfilled }, { new: true });
    },
    deleteCharity: async (_, { _id }) => {
      let params = {};
      if (_id) {
        params = {
          _id
        };
      } else {
        throw new Error('Missing ID for an delete operation');
      }
      const res = await Charity.findByIdAndDelete(params);
      return res;
    },
    deleteRequest: async (_, { _id }) => {
      let params = {};
      if (_id) {
        params = {
          _id
        };
      } else {
        throw new Error('Missing ID for an delete operation');
      }
      const res = await Request.findByIdAndDelete(params);
      return res;
    }
  }
};

module.exports = resolvers;
