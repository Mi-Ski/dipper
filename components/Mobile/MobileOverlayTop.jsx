import React from "react";
import Image from "next/image";
import { useUser } from "../../context/UserContext";

const MobileOverlayTop = ({ clickHandler, expanded }) => {
  const user = useUser();

  return (
    <div
      onClick={clickHandler}
      className="pointer-events-auto p-2 m-4 outline outline-brand-accent  bg-contrast-posts  inline w-min rounded-full active:scale-[0.9] transition-all"
    >
      <div
        className={`rounded-full relative  overflow-hidden w-14 min-w-[50px] h-14 ${
          user.picture ? "" : "border-2 border-contrast-posts"
        }`}
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
          className="rounded-full object-contain"
        />
      </div>
    </div>
  );
};

export default MobileOverlayTop;
