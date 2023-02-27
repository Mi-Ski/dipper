import { useState, useContext, useEffect } from "react";
import { useSetUser } from "../context/UserContext";
import WebsocketContext from "../context/WebsocketContext";
import { webSocket } from "rxjs/webSocket";

import PostsContext from "../context/PostContext";

import Main from "../components/Main/Main";
import Layout from "../components/Layout/Layout";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const setUser = useSetUser();

  const { posts, setPosts } = useContext(PostsContext);
  const { setSocket, setNotifications } = useContext(WebsocketContext);

  useEffect(() => {
    // fetch user and posts
    const fetchPosts = async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      // dont't fetch posts between page changes
      if (posts.length === 0) {
        const tweets = await fetch("/api/tweets/getall");
        const tweetsjson = await tweets.json();
        setPosts(tweetsjson.documents);

        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    // connect to websocket
    const socket = webSocket(
      "wss://hammerhead-app-deaax.ondigitalocean.app"
    );
    setSocket(socket);

    socket.subscribe((notificationObject) => {
      // handle new post notificationObject 
      // setPosts((prevPosts) => [notificationObject, ...prevPosts]);
      console.log(notificationObject);
			setNotifications((prev) => [notificationObject, ...prev]);
    });

    fetchPosts();

    return () => {
      socket.unsubscribe();
    };
  }, [setPosts, setUser]);

  return (
    <Layout>
      <Main
        isLoading={loading}
      />
    </Layout>
  );
}

// redirect to login page if not authenticated
// export const getServerSideProps = withPageAuthRequired();
