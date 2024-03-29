import React, { useState, useContext } from "react";

import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";
import ThemeContext from "../../context/ThemeContext";


import BottomDrawerIcon from "./BottomDrawerIcon";
import Search from "../Sidebar/Search";
import { MdLightMode, MdDarkMode, MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { BsStack, BsSearch } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const MobileOverlayBottom = ({ expanded, techStackPageActive }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const { isDarkTheme,  toggleThemeHandler } = useContext(ThemeContext);
  const user = useUser();
  const router = useRouter();

	const loggedIn = Boolean(user.id);

  return (
    <div
      className={`relative transition-[top] flex flex-col bg-white/[.8] dark:bg-contrast-posts/[.8] pointer-events-auto w-screen p-7  ${
        expanded ? "top-0" : "top-full"
      }`}
    >
      {searchVisible ? (
        <div className="flex items-center">
          <Search />
          <button
            className="w-10 h-10 ml-4  bg-brand-accent text-white dark:bg-border-dark rounded-xl"
            onClick={() => setSearchVisible(false)}
          >
            x
          </button>
        </div>
      ) : (
        <div className="flex gap-x-2 justify-between text-center align-center">
          <BottomDrawerIcon
            onClickAction={toggleThemeHandler}
            description="Motyw"
          >
            {isDarkTheme ? <MdLightMode /> : <MdDarkMode />}
          </BottomDrawerIcon>
          <BottomDrawerIcon
            onClickAction={() =>
              router.push(
                `${techStackPageActive ? "/" : "/techstack"}`
              )
            }
            description={techStackPageActive ? "Home" : "Tech Stack"}
          >
            {techStackPageActive ? <FaHome /> : <BsStack />}
          </BottomDrawerIcon>
          <BottomDrawerIcon
            onClickAction={() => setSearchVisible(true)}
            description="Szukaj"
          >
						<BsSearch />
          </BottomDrawerIcon>

          <BottomDrawerIcon
            onClickAction={() => router.push(`${loggedIn ? "/api/auth/logout" : "/api/auth/login"}`)}
            description={loggedIn ? "Wyloguj się" : "Zaloguj się"}
          >
						{loggedIn ? <MdOutlineLogout /> : <MdOutlineLogin />}
          </BottomDrawerIcon>
        </div>
      )}
    </div>
  );
};

export default MobileOverlayBottom;
