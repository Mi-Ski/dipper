import React, { useState, useContext } from "react";

import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";
import ThemeContext from "../../context/ThemeContext";


import BottomDrawerIcon from "./BottomDrawerIcon";
import Search from "../Sidebar/Search";
import { MdLightMode, MdDarkMode, MdOutlineLogout } from "react-icons/md";
import { BsStack, BsSearch } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const MobileOverlayBottom = ({ expanded, techStackPageActive }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const { darkContext, toggleDarkContext } = useContext(ThemeContext);
  const user = useUser();
  const router = useRouter();

	console.log(user, "USER")

  return (
    <div
      className={`relative transition-[top] flex flex-col bg-contrast-posts pointer-events-auto w-screen p-7  ${
        expanded ? "top-0" : "top-full"
      }`}
    >
      {searchVisible ? (
        <div className="flex items-center">
          <Search />
          <button
            className="w-10 h-10 bg-border-dark rounded-xl"
            onClick={() => setSearchVisible(false)}
          >
            x
          </button>
        </div>
      ) : (
        <div className="flex justify-between text-center align-center">
          <BottomDrawerIcon
            onClickAction={toggleDarkContext}
            description="Motyw"
          >
            {darkContext ? <MdLightMode /> : <MdDarkMode />}
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
            onClickAction={() => router.push("/api/auth/logout")}
            description="Wyloguj się"
          >
						<BsSearch />
          </BottomDrawerIcon>
        </div>
      )}
    </div>
  );
};

export default MobileOverlayBottom;
