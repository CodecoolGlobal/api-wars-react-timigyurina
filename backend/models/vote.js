const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  planet: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    //ref property allows us to set the connection between the two schemas
    ref: "User",
  },
});

module.exports = mongoose.model("Vote", voteSchema);