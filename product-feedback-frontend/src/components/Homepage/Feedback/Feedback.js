import React from "react";

import { ReactComponent as ArrowUp } from "../../../assets/shared/icon-arrow-up.svg";

{
  /* <p>title: {feedback.title}</p>
      <p>category: {feedback.category}</p>
      <p>upvotes: {feedback.upvotes}</p>
      <p>description: {feedback.description}
</p> */
}

const Feedback = ({ feedback }) => {
  return (
    <div className="flex flex-row px-8 mb-6 bg-white rounded-lg py-7">
      <div className="flex flex-col justify-center p-2 rounded-lg bg-main-secondary max-h-14">
        <ArrowUp className="mx-auto mb-2" />
        <p className="text-xs font-semibold ">{feedback.upvotes}</p>
      </div>

      <div className="ml-7">
        <p className="text-lg font-semibold text-navy-primary">
          {feedback.title}
        </p>
        <p className="mb-3 font-light text-md text-navy-tertiary">
          {feedback.description}
        </p>
        <div className="px-3 py-1.5 text-sm font-semibold tracking-wide capitalize rounded-lg max-w-min text-blue-primary bg-main-secondary">
          {feedback.category}
        </div>
      </div>
    </div>
  );
};

export default Feedback;