const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    // console.log("Getting courses line 6")
    User.find()
      .then((users) => {
        console.log(users);
        res.json(users);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          //check this out
          : Thought.deleteMany(
            { username: user.username },
      ))
      .then(() => res.json({ message: "user and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err))
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


//bonus addfriend
addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
  .then((user) =>
    !user
      ? res.status(404).json({ message: "No user with this id!" })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
},

removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  ) .then((user) =>
    !user
      ? res.status(404).json({ message: "No user with this id!" })
      : res.json(user)
  )
}

};
