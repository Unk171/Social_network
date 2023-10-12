const { Thought, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      res.json({ message: "Thought deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      let thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      thought.reactions.push({
        reactionBody: req.body.reactionBody,
        userName: req.body.userName,
      });
      await thought.save();
      res.json(thought.reactions[thought.reactions.length - 1]);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reactionId = req.params.reactionId;
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );
      if (reactionIndex === -1) {
        return res.status(404).json({ message: "No reaction with this ID" });
      }
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();
      return res.status(200).json({ message: "Reaction deleted" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
