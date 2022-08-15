const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema({
  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
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
      default: Date.now,
      // user a getter method to format the timestamp
      // on a query
      get: (createdAtVal) => dateFormat(createdAtVal)
  }
},
{ 
  toJSON: {
  getters: true
  }
});

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
    get: (createdAtVal) => dateFormat(createdAtVal)
    // **** Use getter method to formate the timestamp on a query
  },
  username: {
    type: String,
    required: true
  },
  // ARRAY OF NESTED DOCUMENTS CREATED WITH THE REACTIONSCHEMA.
    reactions: [ReactionsSchema]
},
{ 
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });

// CREATE A VIRTUAL CALLED "reactionCount" THAT RETRIEVES
// THE LENGTH OF THE THOUGHT'S REACTIONS ARRAY FIELD ON QUERY.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;