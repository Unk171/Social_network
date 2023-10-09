const {Schema, model} = require("mongoose");
const userSchema = new Schema({
userName: {
  type: String,
  required: true,
  trim: true,
  unique: true
},
email: {
  type: String,
  required: true,
  unique: true,
  match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
},
thoughts,
friends
});

const User = model("user", userSchema);
module.exports = User