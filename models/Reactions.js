const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema({
    // reactionId: {
    //     default: ObjectId
    // },
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
        get: (createdAtVal) => dateFormat(createdAtVal)
        // user a getter method to formate the timestamp
        // on a query
    }
},
 { 
    toJSON: {
    getters: true
    },
    id: false
});


const Reactions = model('Reactions', ReactionsSchema);

module.exports = Reactions;