import React, { useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { IconContext } from "react-icons";
import Image from "next/image";

import { useRouter } from "next/router";

import { useUser } from "../../context/UserContext";
import UserProfileMenu from "./UserProfileMenu";

const Header = () => {
  const router = useRouter();
  const user = useUser();
  const loggedIn = Boolean(user.id);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const logIn = async () => {
    router.push("/api/auth/login");
  };

	// TODO: navigationContext to change Home > TechStack or Home > Timeline
	// Home = route to the top of page

  return (
    <div className="hidden fixed md:block w-4/5 top-0 z-[2]">
      <div className="flex items-center px-6 py-2 2xl:py-6 justify-between bg-white dark:bg-bgcol-ui-dark  border-t-0 border-l-0 border-b-2 border-r-0 border border-b-border-dark border-solid">
        <div className="flex items-center">
          <div className="w-8 2xl:w-11">
            <IconContext.Provider
              value={{ color: "white", size: "100%" }}
            >
              <MdHomeFilled />
            </IconContext.Provider>
          </div>
          <h1 className="font-semibold text-xl 2xl:text-2xl ml-3">
            Home
          </h1>
        </div>


        <div className="relative mr-16">
          {!loggedIn && (
            <button
              onClick={() => logIn()}
              className="bg-brand-accent px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100"
            >
              Zaloguj się
            </button>
          )}

					{/* pozycja absolute i profilemenuopen jest w srodku pierwszego diva, po otwarciu wychodzi poza dolna krawedz headera */}
          {loggedIn && (
            <>
              <div
                onClick={() => setProfileMenuOpen((old) => !old)}
                className="flex hover:bg-border-dark py-2 px-4 rounded-xl cursor-pointer"
              >
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
                  <p className="font-light text-sm">
                    {user.nickname}
                  </p>
                </div>
              </div>
              {profileMenuOpen && <UserProfileMenu user={user}/>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
