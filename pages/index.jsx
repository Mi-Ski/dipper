import { useState, useContext, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";

import ThemeContext from "../context/ThemeContext";
import PostsContext from "../context/PostContext";

import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";

// import Navbar from "../components/Navbar/Navbar";
// import Flutters from "../components/Flutters/Flutters";
// import CreateFlutter from "../components/Flutters/CreateFlutter";
// import HeaderSearch from "../components/Header/HeaderSearch";

export default function Home(props) {
  const [loading, setLoading] = useState(true);

  const { darkContext } = useContext(ThemeContext);
  const setUser = useSetUser();

  // useEffect(() => {
  //   (async () => {
  //     const getUser = await fetch("/api/user");
  //     const getUserJson = await getUser.json();
  //     setUser(getUserJson);

  //     const getFlutters = await fetch("/api/flutter");
  //     const getFluttersJson = await getFlutters.json();
  //     setFlutters(getFluttersJson);

  //     setIsLoading(false);
  //   })();
  // }, []);
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
    <>
      <div className={`h-screen ${darkContext ? "dark" : ""}`}>
        <div className="flex min-h-full bg-white w-100  dark:bg-bgcol-main-dark dark:text-textcol-main-dark">
          <Sidebar />
          <div className="hidden md:block md:w-1/5"></div>
          <Main isLoading={loading} />

          {/* <div>
            <button onClick={toggleDarkContext}>Click</button>
          </div> */}
        </div>
      </div>
    </>
  );
}

// redirect to login page if not authenticated
// export const getServerSideProps = withPageAuthRequired();
