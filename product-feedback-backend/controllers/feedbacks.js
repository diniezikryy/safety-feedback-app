const feedbacksRouter = require("express").Router();
const { response } = require("express");
const Feedback = require("../models/feedback");

feedbacksRouter.get("/test", async (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

feedbacksRouter.get("/", async (request, response) => {
  const feedbacks = await Feedback.find({});
  console.log(feedbacks);
  response.json(feedbacks);
});

feedbacksRouter.get("/:id", async (request, response) => {
  const feedback = await Feedback.findById(request.params.id);
  if (feedback) {
    response.json(feedback);
  } else {
    response.status(404).end();
  }
});

feedbacksRouter.post("/", async (request, response) => {
  const content = request.body.content;
  const feedback = new Feedback({
    title: content.title,
    category: content.category,
    upvotes: 0,
    status: "suggestion",
    description: content.description,
  });
  const savedFeedback = await feedback.save();
  response.json(savedFeedback.toJSON());
});

module.exports = feedbacksRouter;
