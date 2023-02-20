import React from "react";

const Comment = ({ comment, user, _id }) => {
  return (
      <div>
        {user.name}: {comment}
      </div>
  );
};

export default Comment;
