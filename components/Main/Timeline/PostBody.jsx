import React from "react";
import Image from "next/image";

const PostBody = ({user, body, postedAt}) => {
  return (
    <div className="flex  border md:border px-4 md:px-10 py-7 border-r-transparent border-l-transparent border-t-transparent  border-b-border-dark border-solid">
      <div className="rounded-full overflow-hidden drop-shadow-[0px_10px_10px_#000]">
        <Image
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/150"
          src={user.picture}
          alt="User Avatar"
          title={user.name}
          width={52}
          height={52}
          className="rounded-full "
        />
      </div>
      <div className="flex flex-1 flex-col ml-3">
        <div className="flex justify-between pt-1.5">
          <div className="flex flex-col ">
            <p className="font-medium">{user.nickname}</p>
            <p className="text-text-chill text-xs">{user.name}</p>
          </div>
          <p className="text-text-chill text-xs font-medium">
            {new Date(+postedAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-7 mb-5 text-lg leading-8">{body}</div>
      </div>
    </div>
  );
};

export default PostBody;