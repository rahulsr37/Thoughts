const mongoose = require("mongoose");
const { Schema } = mongoose;

const ThoughtsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  username:{
    type: String,
  },
  thought: {
    type: String,
  },
  date:{
    type: Date,
    default : Date.now
}
});

const Thoughts = mongoose.model("thoughts", ThoughtsSchema);

module.exports = Thoughts;
