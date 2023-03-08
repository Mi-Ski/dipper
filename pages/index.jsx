import { useState, useContext, useEffect } from "react";
import { useSetUser } from "../context/UserContext";
import WebsocketContext from "../context/WebsocketContext";
import { webSocket } from "rxjs/webSocket";

import PostsContext from "../context/PostContext";

import Main from "../components/Main/Main";
import Layout from "../components/Layout/Layout";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [newChunkLoading, setNewChunkLoading] = useState(false);
  const [accumulator, setAccumulator] = useState(8);
  const [accumulatorChanged, setAccumulatorChanged] = useState(false);

  console.log(accumulator, "accumulator");
  const setUser = useSetUser();

  const { posts, topPosts, setPosts, setTopPosts } =
    useContext(PostsContext);
  const { setSocket, setNotifications } =
    useContext(WebsocketContext);

  useEffect(() => {
    // fetch user and posts
    const fetchPosts = async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      // dont't fetch posts between page changes
      if (posts.length === 0 && topPosts.length === 0) {
        const tweets = await fetch(
          `/api/tweets/getall?skip=0&limit=8`
        );
        const tweetsjson = await tweets.json();
        setPosts(tweetsjson.documents);
        setLoading(false);

        const topTweets = await fetch(
          `/api/tweets/getall?skip=0&limit=1000`
        );
        const topTweetsJson = await topTweets.json();
        setTopPosts(topTweetsJson.documents);
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
      // filter out server interval heartbeat
      if (notificationObject.type !== "heartbeat") {
        setNotifications((prev) => [notificationObject, ...prev]);
      }
    });

    fetchPosts();

    return () => {
      socket.unsubscribe();
    };
  }, [setPosts, setUser]);

  useEffect(() => {
    if (posts.length !== 0 && accumulator !== 0) {
      setNewChunkLoading(true);
      const fetchPosts = async () => {
        const tweets = await fetch(
          `/api/tweets/getall?skip=${accumulator}&limit=8`
        );
        const tweetsjson = await tweets.json();
        setPosts((prev) => prev.concat(tweetsjson.documents));
        setNewChunkLoading(false);
        setAccumulatorChanged(false);
      };

      fetchPosts();
    }
  }, [accumulator, setPosts]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;

			console.log(posts.length, topPosts.length);
      if (windowBottom >= docHeight - 200 && !accumulatorChanged && posts.length + 8 < topPosts.length) {
        setAccumulator((prev) => prev + 8);
        setAccumulatorChanged(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [accumulator, posts, topPosts, newChunkLoading, setPosts, setNewChunkLoading]);

  return (
    <Layout>
      <Main isLoading={loading} newChunkLoading={newChunkLoading} />
    </Layout>
  );
}

// redirect to login page if not authenticated
// export const getServerSideProps = withPageAuthRequired();
