import React, { useState, useEffect } from "react";
import { MdHomeFilled, MdOutlineLogout } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { IconContext } from "react-icons";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";

// TODO: onscroll offset calculator to show/hide timeline nav

const Header = ({ routed }) => {
  const router = useRouter();
  const pathname = router.pathname;
  // console.log(pathname);

  const user = useUser();
  const loggedIn = Boolean(user.id);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [timelineNavShown, setTimelineNavShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 200) {
        setTimelineNavShown(true);
      } else {
        setTimelineNavShown(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logIn = async () => {
    router.push("/api/auth/login");
  };

  const logOut = async () => {
    router.push("/api/auth/logout");
  };

  return (
    <div
      className={`hidden fixed md:block w-4/5 top-0  z-[2] ${
        pathname === "/techstack" && "right-0"
      }`}
    >
      <div className="flex items-center px-6 py-1 2xl:py-3 justify-between bg-white dark:bg-bgcol-ui-dark  border-t-0 border-l-0 border-b-2 border-r-0 border border-b-border-dark border-solid">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-8 2xl:w-11">
                <IconContext.Provider
                  value={{ color: "white", size: "100%" }}
                >
                  <MdHomeFilled />
                </IconContext.Provider>
              </div>
              <h1 className="font-semibold text-xl 2xl:text-2xl ml-3 ">
                Home
              </h1>
            </div>
          {!routed && (
            <div
              className={`flex text-text-chill  transition-all ease-in-out duration-200 ${
                timelineNavShown ? " opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-5 mx-2">
                <IconContext.Provider
                  value={{ color: "currentColor", size: "100%" }}
                >
                  <BsDot />
                </IconContext.Provider>
              </div>

              <h2 className="font-semibold">oś czasu</h2>
            </div>
          )}
          {routed && (
            <div
              className={`flex text-text-chill transition-all ease-in-out duration-200 ${
                routed ? " opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-5 mx-2">
                <IconContext.Provider
                  value={{ color: "currentColor", size: "100%" }}
                >
                  <BsDot />
                </IconContext.Provider>
              </div>

              <h2 className="font-semibold">techstack</h2>
            </div>
          )}
          </Link>
        </div>

        <div className="relative mr-16">
          {!loggedIn && (
            <button
              onClick={() => logIn()}
              className="bg-gradient-to-r from-neon-accent-opaque to-brand-accent px-5 py-2 my-2 2xl:py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100"
            >
              Zaloguj się
            </button>
          )}
          {loggedIn && !profileMenuOpen && (
            <>
              <div
                onClick={() => setProfileMenuOpen((old) => !old)}
                className="flex items-center hover:bg-border-dark py-0 2xl:py-2 px-4 rounded-xl cursor-pointer w-[200px] h-[70px] text-ellipsis overflow-hidden"
              >
                <div
                  className={`flex items-center relative  overflow-hidden   ${
                    user.picture ? "" : "border-2 border-border-dark"
                  }`}
                >
                  <Image
                    src={
                      user.picture
                        ? user.picture
                        : "/profilepic-placeholder.png"
                    }
                    alt="user.picture Avatar"
                    title={user.name}
                    width="50"
                    height="50"
                    className="rounded-full "
                  />
                </div>
                <div className="ml-3 truncate">
                  <p className="font-medium text-ellipsis overflow-hidden">
                    {user.name}
                  </p>
                  <p className="font-light text-sm">
                    {user.nickname}
                  </p>
                </div>
              </div>
            </>
          )}
          {loggedIn && profileMenuOpen && (
            <>
              <div className="flex items-center  bg-border-dark/[.5]  rounded-xl  w-[200px] h-[70px] overflow-hidden">
                <div className="flex w-full justify-between items-center h-full">
                  <div
                    onClick={() => setProfileMenuOpen((old) => !old)}
                    className="flex items-center font-black text-2lg h-full mr-2 px-4 h-full bg-border-dark cursor-pointer "
                  >
                    {" "}
                    &lsaquo;
                  </div>
                  <button
                    className="flex items-center mr-8 hover:text-red-500 ease-in transition-all "
                    onClick={logOut}
                  >
                    <IconContext.Provider
                      value={{ color: "currentColor", size: "20px" }}
                    >
                      <MdOutlineLogout />
                    </IconContext.Provider>
                    <p className="flex-1">Wyloguj się</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
