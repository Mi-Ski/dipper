import React from "react";
import Image from "next/image";

const PostBody = ({ user, body, postedAt }) => {
  // wrap each word starting with # in a link redirecting to twitter search
  const formattedBody = body.replace(
    /#[a-zA-Z0-9]+/g,
    (match) =>
      `<a style="color: #4444ff; font-weight: 800;" href="https://twitter.com/search?q=%23${match.slice(
        1,
        match.length
      )}">${match}</a>`
  );

  return (
    <div className="flex border md:border px-4  md:px-10 pt-7 border-r-transparent border-l-transparent border-t-transparent  border-b-transparent border-solid">
      <div className="min-w-max rounded-full overflow-hidden md:drop-shadow-[0px_10px_10px_#000]">
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
      <div className="flex flex-1  flex-col ml-3">
        <div className="flex justify-between pt-1.5">
          <div className="flex flex-col ">
            <p className="font-medium">{user.nickname}</p>
            <p className="text-text-chill text-xs">{user.name}</p>
          </div>
          <p className="text-text-chill text-xs font-medium text-right max-w-[7em] md:max-w-none">
            {new Date(+postedAt).toLocaleString()}
          </p>
        </div>
        <div
          className="mt-7 mb-5 text-lg rich-text leading-8 break-all"
          dangerouslySetInnerHTML={{ __html: formattedBody }}
        ></div>
      </div>
    </div>
  );
};

export default PostBody;
