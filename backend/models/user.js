const mongoose = require("mongoose");
//For the unique prop need to: npm install --save mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  //one user can have multiple votes
  votes: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Vote",
    },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
