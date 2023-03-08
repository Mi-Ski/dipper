import React, { useContext, useState } from "react";
import Image from "next/image";

import ThemeContext from "../../context/ThemeContext";
import { IconContext } from "react-icons";

import { MdLightMode } from "react-icons/md";
import Search from "./Search";
import ParticleBackground from "./ParticleBackground";

// TODO: particles.js background

const Sidebar = ({ routed }) => {
  const { toggleThemeHandler } = useContext(ThemeContext);

  const themeHandler = () => {
    toggleThemeHandler();
  };

  return (
    <div className="hidden md:flex   flex-col justify-between items-center fixed  h-full w-1/5   bg-slate-100 border-t-0 border-l-0 border-b-0 border-r-2  border-r-border-dark border-solid  dark:bg-bgcol-ui-dark">
      {/* overused particle background that I shamelessly copied from stackoverflow :) */}
      <div className="particles mt-[5vh]">
        <ParticleBackground />
      </div>
      <style jsx>{`
        div .particles {
          mask-image: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 36%,
            rgba(0, 0, 0, 1) 56%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-mode: alpha;
        }
      `}</style>
      <div className="absolute z-30">
        <div className="flex flex-col xl:flex-row py-[10vh]  items-center justify-center 2xl:mr-7">
          <div className="w-24 2xl:w-fit h-fit select-none">
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
          <h2 className="select-none font-bold cursor-default text-2xl 2xl:text-4xl xl:ml-2 2xl:ml-3 ">
            Dipper{" "}
          </h2>
        </div>
        {!routed && <Search />}
      </div>
      <div className="w-full">
        <p className="text-center cursor-default text-text-chill text-xs 2lg:text-sm mb-3">
          v0.1.80-dev
        </p>
        <div className="md:py-[3vh] justify-start  flex border-t-2 border-l-0 border-b-0 border-r-0  border-t-border-dark border-solid">
          <button
            className="flex justify-center items-center mx-auto  gap-x-2 hover:bg-border-dark/[.6] rounded-md p-2 px-4"
            onClick={themeHandler}
          >
            <IconContext.Provider
              value={{ color: "currentColor", size: "20px" }}
            >
              <MdLightMode />
            </IconContext.Provider>
            <p className="">Motyw</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
