import React from "react";
import PostsContext from "../../../context/PostContext";

import AddPost from "./AddPost";
import Post from "./Post";
import Loading from "../../Loading";

const Timeline = ({ postsLoading }) => {
  const { posts } = React.useContext(PostsContext);
	console.log(posts)
  // _id, user[], body, postedAt, likes[]
  // userid, name, nickname, picture

  return (
    <div className="w-screen lg:w-3/4 overflow-y-auto">
      <div className="w-[98%] md:w-2/3 lg:w-4/5 mx-auto">
        <AddPost />
        {postsLoading ? (
          <Loading size="50" classes="py-40"/>
        ) : (
          <div>
            {posts.map((post) => (
              <Post
                key={post._id}
                postedAt={post.postedAt}
                likes={post.likes}
                user={post.user}
								body={post.body}
								_id={post._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
