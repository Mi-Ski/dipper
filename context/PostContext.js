import React from "react";

const PostsContext = React.createContext([]);

export default PostsContext;

export function PostsProvider(props) {
  const [posts, setPosts] = React.useState([]);
  return (
    <PostsContext.Provider
      value={{
				posts,
				setPosts
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}
