import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import ButtonTertiary from "../Elements/Buttons/ButtonTertiary";
import FeedbackDetail from "../FeedbackView/FeedbackDetail";
import FeedbackDetailComment from "./FeedbackDetailComment";
import Alerts from "../Elements/Alerts/Alerts";

import feedbackService from "../../services/feedback";
import commentService from "../../services/comment";

import NotificationContext from "../../contexts/NotificationContext";
import UserContext from "../../contexts/UserContext";

const FeedbackDetailView = () => {
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [user, setUser] = useState("");
  const [showDelete, setShowDelete] = useState(true);

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { message, type, setNewMessage } = useContext(NotificationContext);

  const id = useParams().id;

  useEffect(() => {
    feedbackService.getAll().then((initalFeedbacks) => {
      setFeedback(initalFeedbacks.find((feedback) => feedback.id === id));
      const feedback = initalFeedbacks.find((feedback) => feedback.id === id);
      setComments(feedback.comments);
      setUser(feedback.user.username);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedFeedbackAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setLoggedInUser(user.username);
      commentService.setToken(user.token);
    }

    if (loggedInUser === user) {
      setShowDelete(true);
    }
  }, []);

  const handleCommentChange = (event) => {
    event.preventDefault();
    setCommentContent(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();

    const newComment = {
      _Id: id,
      content: commentContent,
      replies: [],
      user: {
        username: loggedInUser.name,
        name: loggedInUser.username,
      },
    };

    commentService.createNewComment(newComment);
    setComments(feedback.comments.concat(newComment));
    setNewMessage("Your comment has been added!", "success");

    console.log(comments);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <svg
            role="status"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-navy-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-6 sm:mx-28 md:max-w-xl md:mx-auto">
        <Alerts type={type} message={message} />
        <div className="flex items-center justify-between mt-8">
          <div>
            <Link to="/">
              <ButtonTertiary buttonText="Go Back" />
            </Link>
          </div>

          <div>
            {showDelete && (
              <Link to={`/edit-feedback/${feedback.id}`}>
                <button className="w-full px-6 py-3 text-sm font-semibold leading-5 text-center text-white rounded-lg cursor-pointer text-b bg-fuchsia-600 hover:bg-fuchsia-400">
                  Edit Feedback
                </button>
              </Link>
            )}
          </div>
        </div>

        <FeedbackDetail feedback={feedback} />

        <div className="p-6 mt-6 bg-white rounded-lg md:mx-auto">
          <h1 className="text-lg font-bold text-navy-primary">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h1>

          {comments.length !== 0 ? (
            <div className="mt-2 border-grey-50">
              {comments.map((comment, index) => (
                <FeedbackDetailComment key={index} comment={comment} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        <form
          onSubmit={addComment}
          className="p-6 mt-6 bg-white rounded-lg md:mx-auto"
        >
          <h1 className="text-lg font-bold text-navy-primary">Add a comment</h1>
          <p className="text-sm font-light text-navy-tertiary">
            Max 250 characters.
          </p>
          <textarea
            onChange={handleCommentChange}
            className="mt-4 bg-main-secondary text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-24 p-2.5"
          ></textarea>
          <div className="flex w-full justify-items-end">
            <button
              type="submit"
              className="px-6 py-3 mt-4 ml-auto text-sm font-semibold leading-5 text-center text-white rounded-lg cursor-pointer text-b bg-fuchsia-600 hover:bg-fuchsia-400"
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default FeedbackDetailView;
