import { useState, useContext, useEffect } from "react";
import { useSetUser } from "../context/UserContext";

import PostsContext from "../context/PostContext";

import Main from "../components/Main/Main";
import Layout from "../components/Layout/Layout";

export default function Home(props) {
  const [loading, setLoading] = useState(true);

  const setUser = useSetUser();

  const { setPosts } = useContext(PostsContext);

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      const tweets = await fetch("/api/tweets/getall");
      const tweetsjson = await tweets.json();
      setPosts(tweetsjson.documents);

      setLoading(false);
      console.log("useeffect");
    })();
  }, [setPosts, setUser]);

  return (
		<Layout >
        <Main isLoading={loading} />
		</Layout>
  );
}

// redirect to login page if not authenticated
// export const getServerSideProps = withPageAuthRequired();
