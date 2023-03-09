import React from "react";
import Image from "next/image";

// split abnormally long words (like links) into chunks of 25 characters
function splitLongWords(str) {
  const words = str.split(" ");
  const newWords = words.map((word) => {
    if (word.length > 22) {
      const firstChunk = word.slice(0, 22);
      const rest = word.slice(22);
      return `${firstChunk} ${splitLongWords(rest)}`;
    } else {
      return word;
    }
  });
  return newWords.join(" ");
}

// style="color: #4444ff; font-weight: 800;"

const PostBody = ({ user, body, postedAt }) => {
  const chunkedBody = splitLongWords(body);

  // wrap each word starting with # in a link redirecting to twitter search
  const formattedBody = chunkedBody.replace(
    /#[a-zA-Z0-9]+/g,
    (match) =>
      `<span class="px-[2px] py-1 hover:bg-gradient-to-b from-transparent to-border-dark/[.2] dark:to-border-dark/[.5] 
 rounded-md"><a target="_blank" class="font-bold bg-gradient-to-br from-neon-accent2-opaque  to-neon-accent-opaque bg-clip-text text-transparent" href="https://twitter.com/search?q=%23${match.slice(
   1,
   match.length
 )}">${match}</a></span>`
  );

  return (
    <div className="flex border md:border px-4  md:px-10 pt-7 border-r-transparent border-l-transparent border-t-transparent  border-b-transparent border-solid">
      <div className="min-w-max rounded-full overflow-hidden md:drop-shadow-[0px_10px_10px_#aaa] dark:md:drop-shadow-[0px_10px_10px_#000]">
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
          className="mt-7 mb-5 text-lg rich-text leading-8 break-words"
          dangerouslySetInnerHTML={{ __html: formattedBody }}
        ></div>
      </div>
    </div>
  );
};

export default PostBody;
