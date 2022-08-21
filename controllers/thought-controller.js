<<<<<<< HEAD
const { Thought, User } = require('../models');

const thoughtController = {

  // get all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  // PUSHED THE CREATED THOUGHT'S _id TO ASSOCIATED USER'S 
  // thoughts ARRAY FIELD 
  addThought({ params, body }, res) {
    console.log("Create Thought Query Hit!")
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: {thoughts: _id } },
        { new: true }
      );
    })
      .then (console.log( [thoughts] ))
      .then(dbUserData => {
        // if (!dbUserData) {
        //   res.status(404).json({ message: 'No user by that id!'});
        //   return;
        // }
      res.json(dbUserData);
    })
      .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true }
      )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with ths id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thought: params.thoughtId } },
          { new: true}
      );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(true);
      })
      .catch(err => res.json(err));
  },

//   /api/thoughts/:thoughtId/reactions
// PUT to create a reaction stored in a single thought's reactions array field
createReaction({ params, body }, res) {
  console.log(body);
  Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
  .then(dbThoughtData => {
    if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!'});
        return;
    }
    res.json(dbThoughtData);
})
.catch(err => res.json(err));
},

// DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionID: params.reactionId } } },
    { new: true }
  )
    .then((dbUserData) => res.json(dbUserData))
    .catch(err => res.json(err));
}
};

module.exports = thoughtController;
=======
>>>>>>> feature/GETUSER
