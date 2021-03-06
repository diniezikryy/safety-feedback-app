const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  title: String,
  category: String,
  upvotes: Number,
  status: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

feedbackSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
