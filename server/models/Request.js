const mongoose = require('mongoose');
mongoose.Schema.Types.String.checkRequired(v => v != null);

const { Schema } = mongoose;

const requestSchema = new Schema({
  requestTitle: {
    type: String,
    required: true
  },
  requestDescription: {
    type: String,
    required: true
  },
  neededDate: {
    type: String,
    required: true
  },
  isFulfilled: {
    type: Boolean,
    required: true
  },
  comments: {
    type: Array
  },
  charity_ID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
