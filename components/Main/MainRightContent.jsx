import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PostsContext from "../../context/PostContext";
import Loading from "../Loading";

const MainRightContent = () => {
  const { posts } = useContext(PostsContext);
  const router = useRouter();


  const redirectHandler = () => {
    router.push("/techstack");
  };

  const getFeaturedUsers = () => {
    // reduce posts array to array of users, without duplicates, and sort by number of posts
    const topUsers = [];
    posts.forEach((post) => {
      const user = post.user;
      const userIndex = topUsers.findIndex((u) => u.id === user.id);
      if (userIndex === -1) {
        topUsers.push({ ...user, posts: 1 });
      } else {
        topUsers[userIndex].posts++;
      }
    });
    topUsers.sort((a, b) => b.posts - a.posts);
    const topUsersLimited = topUsers.slice(0, 3);

    return topUsersLimited;
  };

  const featuredUsers = getFeaturedUsers();

  return (
    <>
      <div
        id="databox"
        className={`hidden lg:block w-auto mr-0 sticky -top-[20rem]  max-h-[100vh]  `}
      >
        <div
          onClick={redirectHandler}
          className="cursor-pointer p-3 bg-white dark:bg-contrast-posts mb-10 border-2 border-border-dark border-solid rounded"
        >
          <div className="p-20 relative w-full w-full ">
            <Image
              placeholder="blur"
              blurDataURL="https://via.placeholder.com/150"
              src={"/icon-pictureasset.png"}
              alt="User Avatar"
              layout="fill"
              className=" object-cover opacity-25"
            />
          </div>
          <h2 className="text-center">W trakcie: podstrona 2</h2>
        </div>
        <div className="w-full bg-white dark:bg-contrast-posts mb-10 border-2 border-border-dark border-solid rounded py-3">
          {featuredUsers.length > 0 && (
              <h2 className="uppercase text-xs text-center w-[75%] mx-auto  mt-2 mb-3 ">
                Top użytkownicy miesiąca
              </h2>
          )}
          {featuredUsers.length === 0 && (
            <Loading size="20" classes="py-10" />
          )}
          {featuredUsers.length > 0 &&
            featuredUsers.map((user) => (
              <div
                className="flex items-center bg-white/[.01] w-[90%] mx-auto mb-2 p-2 rounded-md"
                key={user.id}
              >
                <div
                  className={`rounded-full relative  overflow-hidden w-auto min-w-[2.3rem] max-w-[2.3rem] h-9  ${
                    user.picture ? "" : "border-2 border-border-dark"
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
                    className="rounded-full "
                  />
                </div>
                <div className="flex-col flex-1">
                  <h2 className="text-center text-sm">
                    {user.nickname}
                  </h2>
                  <h2 className="text-center rounded-full bg-brand-accent w-min mx-auto px-2 my-1">
                    {user.posts}
                  </h2>
                </div>
              </div>
            ))}
          <h5 className="text-xs text-center w-[85%] mx-auto  mb-1 mt-3 text-text-chill">
            liczone na podstawie ilości postów
          </h5>
        </div>
        <div className="text-text-chill">[github, wersja, &copy;copyright]</div>
      </div>
    </>
  );
};

export default MainRightContent;
