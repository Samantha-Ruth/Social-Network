const { User } = require("../models");
const userController = {
  // Get all Users
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
      .select ('-__v')
      .sort ({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get a User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate ({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // Update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(true);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add a Friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
          { _id: params.id },
          { $push: { friends: params.friendId } },
          { new: true, runValidators:true }
        )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // Delete a Friend because they did that thing
  // and seriously crossed the line and now there's just no going back
  // and honestly, you're better without them!
  // But they also make really good scones...  so.... you could always friend them again, right? 
  removeFriend({ params }, res) {
    console.log(params);
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No friend found with this id!" });
          return;
        }
        res.json(true);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
