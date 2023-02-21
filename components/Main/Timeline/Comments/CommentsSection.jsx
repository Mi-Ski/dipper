import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsSection = ({comments, user, addCommentHandler}) => {
  return (
    <div>
      <div>
        {comments &&
          comments.map((comment) => (
            <Comment
              key={Math.random()}
              comment={comment.body}
              user={comment.user}
              _id={comment.id}
            />
          ))}
      </div>
      <AddComment
        user={user}
        addCommentHandler={addCommentHandler}
      ></AddComment>
    </div>
  );
};

export default CommentsSection;
