const mongoose = require('mongoose');
mongoose.Schema.Types.String.checkRequired(v => v != null);

const { Schema } = mongoose;

const charitySchema = new Schema({
  charityName: {
    type: String,
    required: true
  },
  missionStatement: {
    type: String
  },
  charityType: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  owner_ID: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
});

const Charity = mongoose.model('Charity', charitySchema);
module.exports = Charity;
