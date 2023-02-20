import React from "react";

const Comment = ({ key, comment, user, _id }) => {
  return (
      <div>
        {user.name}: {comment}
      </div>
  );
};

export default Comment;
