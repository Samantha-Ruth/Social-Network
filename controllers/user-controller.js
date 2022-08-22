const { User } = require("../models");
const userController = {
  // get all users
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

  // Get individual user by id
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

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update user by id
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

  // delete User
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

  // addFriend
  addFriend({ params, body }, res) {
    console.log(body);
    User.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete Friend
  removeFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.userId });
    then((removedFriend) => {
      if (!removedFriend) {
        return res.status(404).json({ message: "No friend with this id!" });
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.userId } },
        { new: true }
      );
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(true);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
