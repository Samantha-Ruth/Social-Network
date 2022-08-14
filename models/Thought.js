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
    get: (createdAtVal) => dateFormat(createdAtVal)
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
    ref: 'Reactions'
        }
    ]
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
