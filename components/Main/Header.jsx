import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IconContext } from "react-icons";
import Image from "next/image";

import { useRouter } from "next/router";

import { useUser } from "../../context/UserContext";

const Header = () => {
  const router = useRouter();
  const user = useUser();
  const loggedIn = Boolean(user.id);

  const logIn = async () => {
    router.push("/api/auth/login");
  };

  return (
    <div className="hidden fixed md:block w-4/5 top-0 z-[2]">
      <div className="flex items-center px-6 py-4 2xl:py-6 justify-between bg-white dark:bg-bgcol-ui-dark  border-t-0 border-l-0 border-b-2 border-r-0 border border-b-border-dark border-solid">
        <div className="flex items-center">
          <div className="w-8 2xl:w-11">
            <IconContext.Provider
              value={{ color: "white", size: "100%" }}
            >
              <MdHomeFilled />
            </IconContext.Provider>
          </div>
          <h1 className="font-semibold text-xl 2xl:text-2xl ml-3">Home</h1>
        </div>
        <div className="flex mr-16">
          {!loggedIn && (
            <button
              onClick={() => logIn()}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Log In
            </button>
          )}
          {loggedIn && (
            <>
              <div className="rounded-full overflow-hidden	w-12 h-12">
                <Image
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/150"
                  src={user.picture}
                  alt="User Avatar"
                  title={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.name}</p>
                <p className="font-light text-sm">{user.nickname}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
