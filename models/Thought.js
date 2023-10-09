const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    typr: String,
    required: true,
    min_lenght: 1,
    max_lenght: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
   },
   userName: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});
