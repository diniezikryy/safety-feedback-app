import { useEffect, useState } from "react";

import FeedbackCard from "./FeedbackCard";
import NoFeedbackCard from "./NoFeedbackCard";

const FeedbackList = ({ feedbacks, showFeedbacks }) => {
  return (
    <div className="mx-6 my-8 sm:mx-0">
      {showFeedbacks ? (
        feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))
      ) : (
        <NoFeedbackCard />
      )}
    </div>
  );
};

export default FeedbackList;
