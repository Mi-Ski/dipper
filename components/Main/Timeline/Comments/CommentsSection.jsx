import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsSection = ({comments, user, addCommentHandler, loading}) => {
  return (
    <div className=" pb-4">
      <div className="px-10">
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
				loading={loading}
      ></AddComment>
    </div>
  );
};

export default CommentsSection;
