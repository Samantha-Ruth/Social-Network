const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema({
  // set custom id to avoid confusion with parent comment's _id field
  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxLength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      // getter method to format the timestamp
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
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // using getter method to formate the timestamp
    get: (createdAtVal) => dateFormat(createdAtVal)
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

// Virtual that retrieves length of thought reaction's array field.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;