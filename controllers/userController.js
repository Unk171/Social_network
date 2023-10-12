const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and his thoughts deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      let user = await User.findOne({ _id: req.params.userId });
      const friendId = req.body.friend;
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
      }
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter(
          (friend) => friend.toString() !== friendId
        );
        await user.save();
      } else {
        return res.status(404).json({ message: "No friend with this ID" });
      }

      res.status(200).json({message: "Friend deleted"});
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
