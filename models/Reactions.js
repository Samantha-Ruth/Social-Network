const { Schema, model } = require('mongoose');

const ReactionsSchema = new Schema({
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

const Reactions = model('Reactions', ReactionsSchema);

module.exports = Reactions;