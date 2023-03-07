import React from "react";

const PostsContext = React.createContext([]);

export default PostsContext;

export function PostsProvider(props) {
  const [posts, setPosts] = React.useState([]);
	const [topPosts, setTopPosts] = React.useState([]);
  return (
    <PostsContext.Provider
      value={{
				posts,
				setPosts,
				topPosts,
				setTopPosts
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}
