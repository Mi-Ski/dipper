import { useState, useContext } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import classes from "./index.module.css";

import { ThemeProvider } from "../context/ThemeContext";
import ThemeContext from "../context/ThemeContext";

import Loading from "../components/Loading";
import Post from "../components/Post";

// import Navbar from "../components/Navbar/Navbar";
// import Flutters from "../components/Flutters/Flutters";
// import CreateFlutter from "../components/Flutters/CreateFlutter";
// import HeaderSearch from "../components/Header/HeaderSearch";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  // const [flutters, setFlutters] = useState([]);
  // const [page, setPage] = useState("Home");
  // const setUser = useSetUser();

  const { darkContext, toggleDarkContext } = useContext(ThemeContext);

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

	const tweets = [
		{
			_id: 1,
			postedAt: "1651965202500",
			body: "This is a tweet",
			likes: ["34sdfdf99"],
			user: {
				name: "jdoe@ga.com",
				nickname: "johndoe",
				picture: "https://random.imagecdn.app/300/300"
			}
			
		},
		{
			_id: 2,
			postedAt: "1650065202500",
			body: "This is a second tweet",
			likes: ["34sdfdf99", "sad89f99f"],
			user: {
				name: "miski@gn.cn",
				nickname: "Mi Ski",
				picture: "https://random.imagecdn.app/300/300"
			}
			
		}
	]

  return (
    <>
      <div className={darkContext ? "dark " : ""}>
        <div className="bg-slate-500 w-100 min-h-screen dark:bg-slate-900 dark:text-blue-100">

          <h1>HELLO HELLO</h1>
          <div>
            <button onClick={toggleDarkContext}>Click</button>
          </div>
          {isLoading && <Loading></Loading>}

					{ tweets.map(tweet => (
						<Post body={tweet.body} key={tweet._id} img={tweet.user.picture} name={tweet.user.name} nickname={tweet.user.nickname} likes={tweet.likes} />
					))}
        </div>
      </div>
    </>
  );
}

// redirect to login page if not authenticated
// export const getServerSideProps = withPageAuthRequired();
