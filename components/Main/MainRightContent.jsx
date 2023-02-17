import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";

const MainRightContent = () => {
	const router = useRouter();

	const redirectHandler = () => {
		router.push("/techstack");
	}

  return (
    <div className="hidden lg:block w-1/5 mr-10">
      <div onClick={redirectHandler} className="cursor-pointer bg-white dark:bg-contrast-posts mb-10 border-2 border-border-dark border-solid rounded">
        <div className="p-20 relative w-full w-full ">
          <Image
            placeholder="blur"
            blurDataURL="https://via.placeholder.com/150"
            src={"/icon-pictureasset.png"}
            alt="User Avatar"
            layout="fill"
            width={50}
            className=" object-cover opacity-25"
          />
        </div>
        <h2>W trakcie: podstrona 2</h2>
      </div>
      <div className="py-20 w-full bg-white dark:bg-contrast-posts mb-10 border-2 border-border-dark border-solid rounded">
        <h2 className="text-center">Featured users</h2>
      </div>
    </div>
  );
};

export default MainRightContent;
