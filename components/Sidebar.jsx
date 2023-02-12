import React, { useState } from "react";
import Image from "next/image";

import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";

const Sidebar = () => {
  const [inputActive, setInputACtive] = useState(false);

  return (
    <div className="hidden md:flex  flex-col justify-between items-center fixed  h-full w-1/5  bg-slate-100 border-t-0 border-l-0 border-b-0 border-r-2  border-r-border-dark border-solid  dark:bg-bgcol-ui-dark">
      <div>
        <div className="flex flex-col xl:flex-row py-[10vh]  items-center justify-center mr-7">
          <div className="w-24 2xl:w-fit h-fit ">
            <Image
              placeholder="blur"
              blurDataURL={`/_next/image?url=/icon-pictureasset.png&w=16&q=1`}
              src={"/icon-pictureasset.png"}
              alt="Dipper Logo"
              width={120}
              height={120}
              className="drop-shadow-logo"
            />
          </div>
          <h2 className=" font-bold text-2xl 2xl:text-4xl xl:ml-2 2xl:ml-3">Dipper</h2>
        </div>
        <div
          className={`${
            inputActive && "drop-shadow-input ring-2 ring-border-neon"
          } flex rounded-md overflow-hidden  bg-bgcol-ui-dark border-2  border-border-dark border-solid max-w-[80%] mx-auto 2xl:max-w-[100%]`}
        >
          <div className="grid place-items-center bg-border-dark  2xl:py-5 px-3">
            <IconContext.Provider
              value={{ color: "white", size: "20px" }}
            >
              <BsSearch />
            </IconContext.Provider>
          </div>
          <div className="bg-contrast-posts flex-1 ">
            <input
              onFocus={() => {
                setInputACtive(true);
              }}
              onBlur={() => setInputACtive(false)}
              type="text"
              placeholder="Szukaj wpisów..."
              className="bg-transparent w-full h-full text-white py-3 px-2 2xl:py-5 2xl:px-5 focus:outline-none "
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full p-3 md:p-[5vh] justify-center flex border-t-2 border-l-0 border-b-0 border-r-0  border-t-border-dark border-solid">
          <IconContext.Provider
            value={{ color: "white", size: "20px" }}
          >
            <RiToggleFill />
          </IconContext.Provider>
          <p className="flex-1">Motyw</p>
        </div>
        <div className="w-full md:p-[5vh] justify-center flex border-t-2 border-l-0 border-b-0 border-r-0  border-t-border-dark border-solid">
          <IconContext.Provider
            value={{ color: "white", size: "20px" }}
          >
            <MdOutlineLogout />
          </IconContext.Provider>
          <p className="flex-1">Wyloguj się</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
