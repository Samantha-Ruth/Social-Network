const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    // CHECK IF THESE WORK!
    min: [1],
    max: [280]
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // **** Use getter method to formate the timestamp on a query
  },
  username: {
    type: String,
    required: true
  },
  // *** MAKE SURE THESE WORK!! ****
  // THIS NEEDS TO BE AN ARRAY OF NESTED DOCUMENTS CREATED
  // WITH THE REACTIONSCHEMA.
    reactions: [
        { 
    type: Schema.Types.ObjectId,
    ref: 'REACTION'
        }
    ],
    reactionId: {
        default: ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280]
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
        // user a getter method to formate the timestamp
        // on a query
    }
    
});

// CREATE A VIRTUAL CALLED "reactionCount" THAT RETRIEVES
// THE LENGTH OF THE THOUGHT'S REACTIONS ARRAY FIELD ON QUERY.

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
