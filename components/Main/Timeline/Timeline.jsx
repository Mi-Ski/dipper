import React from "react";
import PostsContext from "../../../context/PostContext";

import AddPost from "./AddPost";
import Post from "./Post";
import SkeletonLoad from "../../SkeletonLoad";

const Timeline = ({ postsLoading }) => {
  const { posts } = React.useContext(PostsContext);
  // _id, user[], body, postedAt, likes[]
  // userid, name, nickname, picture
	// postsLoading = true;

  return (
    <div className="w-screen lg:w-3/4 overflow-y-auto">
      <div className="w-full md:w-2/3 lg:w-4/5 mx-auto ">
        <AddPost />
        {postsLoading ? (
					<SkeletonLoad />
        ) : (
          <div className="w-[98%] lg:w-full mx-auto">
            {posts?.length > 0 && posts.map((post) => (
              <Post
                key={post._id}
                postedAt={post.postedAt}
                likes={post.likes}
                user={post.user}
                body={post.body}
                _id={post._id}
								comments={post.comments}
								postObj={post}
              />
            ))}
						{Boolean(!posts) && <p className="text-center text-white text-xl py-20">Błąd w ładowaniu postów 😿</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
