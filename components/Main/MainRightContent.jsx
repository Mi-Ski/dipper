import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PostsContext from "../../context/PostContext";

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
    const topUsersLimited = topUsers.slice(0, 5);

    return topUsersLimited;
  };

  const featuredUsers = getFeaturedUsers();

  return (
    <div className="hidden lg:block w-1/5 mr-10">
      <div
        onClick={redirectHandler}
        className="cursor-pointer bg-white dark:bg-contrast-posts mb-10 border-2 border-border-dark border-solid rounded"
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
        <h2>W trakcie: podstrona 2</h2>
      </div>
      <div className="py-20 w-full bg-white dark:bg-contrast-posts mb-10 border-2 border-border-dark border-solid rounded">
          {featuredUsers.length > 0 && <h2>Top użytkownicy miesiąca</h2>}
          {featuredUsers.length === 0 &&
            <h2>Brak aktywnych użytkowników</h2>}
          {featuredUsers.length > 0 &&
            featuredUsers.map((user) => (
              <div key={user.id}>
                <h2 className="text-center">{user.nickname}</h2>
                <h2 className="text-center">{user.posts}</h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MainRightContent;
