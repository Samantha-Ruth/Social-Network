const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  thoughts: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
    }
],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
},
{ 
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Need to create a "virtual" called friendCount
// that retrieves the length of a user's friend array field
// on a query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;
