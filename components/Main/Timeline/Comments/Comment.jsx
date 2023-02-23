import React from "react";
import Image from "next/image";

const Comment = ({ comment, user, _id }) => {
  return (
    <div className="flex gap-x-2 py-3 px-4 hover:bg-white/[.02] rounded-xl">
      <div
        className={`rounded-full relative  overflow-hidden w-14 min-w-[2.3rem] max-w-[2.3rem] h-9  ${
          user.picture ? "" : "border-2 border-border-dark"
        }`}
      >
        <Image
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/150"
          src={
            user.picture
              ? user.picture
              : "/profilepic-placeholder.png"
          }
          alt="User Avatar"
          title={user.name}
          layout="fill"
          className="rounded-full "
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="text-text-chill font-medium">{user.nickname}</div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
