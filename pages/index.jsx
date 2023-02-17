import { useState, useContext, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import { styles } from "./index.module.css";

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
      <div className={`h-screen ${darkContext ? "dark" : ""} `}>
        <div className="flex min-h-full relative  dark:text-textcol-main-dark">
          <div
            // style={{
            //   background: "rgb(7,7,10)",
            //   background:
            //     "linear-gradient(45deg, rgba(7,7,10,1) 0%, rgba(7,7,10,1) 44%, rgba(6,8,15,1) 61%, rgba(7,7,10,1) 76%, rgba(7,7,10,1) 100%);",
            // }}
            className={`w-full h-full fixed z-0`}
          ></div>
          <style jsx>{`
            div {
              background: linear-gradient(
                45deg,
                rgba(7, 7, 10, 1) 0%,
                rgba(7, 7, 10, 1) 44%,
                rgba(6, 8, 15, 1) 61%,
                rgba(7, 7, 10, 1) 76%,
                rgba(7, 7, 10, 1) 100%
              );
            }
          `}</style>
          <Sidebar />
          <div className="hidden md:block md:w-1/5"></div>
          <Main isLoading={loading} />
        </div>
      </div>
    </>
  );
}

// redirect to login page if not authenticated
// export const getServerSideProps = withPageAuthRequired();
