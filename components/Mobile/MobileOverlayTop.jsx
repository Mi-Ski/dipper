import React from "react";
import Image from "next/image";
import { useUser } from "../../context/UserContext";

const MobileOverlayTop = ({ clickHandler, pingClicked }) => {
  const user = useUser();

  return (
    <div
      onClick={clickHandler}
      className="relative pointer-events-auto p-1  m-4   w-min rounded-full active:scale-[0.9] transition-all"
    >
      {!pingClicked && (
        <div className="absolute z-100 ">
          <div className="relative">
            <span className="absolute h-4 w-4 rounded-full bg-red-500 "></span>
            <span className="absolute animate-ping opacity-50   rounded-full h-4 w-4 bg-red-500"></span>
          </div>
        </div>
      )}
      <div
        className={`rounded-full relative overflow-hidden w-14 min-w-[50px] h-14`}
      >
        <Image
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/150"
          src={
            user.picture
              ? user.picture
              : "/profilepic-placeholder.png"
          }
          alt="User Avatar"
          title={user.name}
          layout="fill"
          className="rounded-full object-contain bg-white"
        />
      </div>
    </div>
  );
};

export default MobileOverlayTop;
