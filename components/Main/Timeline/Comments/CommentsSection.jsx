import React, { useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

const CommentsSection = ({
  comments,
  user,
  currentUser,
  addCommentHandler,
  loading,
}) => {
  const [allCommentsShown, setAllCommentsShown] = useState(false);

  let lastCommentIndex, secondLastCommentIndex;
  if (comments) {
    lastCommentIndex = comments.length - 1;
  }
  if (comments && comments.length >= 2) {
    secondLastCommentIndex = comments.length - 2;
  }

  return (
    <div className=" py-4 border  border-border-dark  border-x-0 border-b-0">
      <div className="px-10">
        {allCommentsShown && (
          <div>
            {comments.map((comment, idx) => {
              if (idx === lastCommentIndex) return;
              if (idx === secondLastCommentIndex) return;

              return (
                <Comment
                  key={Math.random()}
                  comment={comment.body}
                  user={comment.user}
                  _id={comment.id}
                />
              );
            })}
          </div>
        )}
        {comments && comments.length > 2 && (
          <div className="flex justify-center">
            <button
              className=" flex text-primary font-bold text-sm bg-brand-accent rounded-md px-2 py-1"
              onClick={() => setAllCommentsShown(!allCommentsShown)}
            >
              {allCommentsShown && `Ukryj komentarze`}
              {!allCommentsShown &&
                `Pokaż więcej (${comments.length - 2}) `}
            </button>
          </div>
        )}
        {comments && comments[secondLastCommentIndex] && (
          <Comment
            comment={comments[secondLastCommentIndex].body}
            user={comments[secondLastCommentIndex].user}
            _id={comments[secondLastCommentIndex].id}
          />
        )}
        {comments && comments[lastCommentIndex] && (
          <Comment
            comment={comments[lastCommentIndex].body}
            user={comments[lastCommentIndex].user}
            _id={comments[lastCommentIndex].id}
          />
        )}
      </div>
      <AddComment
        user={user}
        currentUser={currentUser}
        addCommentHandler={addCommentHandler}
        loading={loading}
      ></AddComment>
    </div>
  );
};

export default CommentsSection;
