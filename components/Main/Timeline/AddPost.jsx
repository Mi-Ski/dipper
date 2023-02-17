import React, { useState, useContext } from "react";
import { useUser } from "../../../context/UserContext";
import PostsContext from "../../../context/PostContext";
import Card from "../../Card";
import Image from "next/image";

import { useRouter } from "next/router";

const AddPost = () => {
  const [inputValue, setInputValue] = useState("");
  const { setPosts } = useContext(PostsContext);
  const user = useUser();
  const loggedIn = Boolean(user.id);
  const router = useRouter();

  const logIn = async () => {
    router.push("/api/auth/login");
  };

  const onSubmitTweet = async (event) => {
    event.preventDefault();

    if (!loggedIn) {
      logIn();
    } else {
      console.log(user);

      const newTweet = {
        postedAt: Date.now(),
        body: inputValue,
        likes: [],
        user: {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          picture: user.picture,
        },
      };
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTweet),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      setPosts((oldState) => [
        {
          _id: responseJson.insertedId,
          ...newTweet,
        },
        ...oldState,
      ]);
      setInputValue("");
    }
  };

  const addEmojiToInput = (event, emojiCode) => {
    event.preventDefault();
    if (!loggedIn) return;
    let emoji;

    switch (emojiCode) {
      case 1:
        emoji = "🔥";
        break;
      case 2:
        emoji = "👍";
        break;
      case 3:
        emoji = "😄";
        break;
      case 4:
        emoji = "💖";
        break;
      default:
        emoji = "";
    }
    setInputValue(inputValue + emoji);
  };

  return (
    <Card classes={["px-10 pt-10 pb-5 shadow-lg shadow-black/[.55]"]}>
      <form onSubmit={onSubmitTweet} className="w-full">
        <div className="flex flex-col space-y-10">
          <div className="flex items-center h-14">
            <div
              className={`rounded-full relative  overflow-hidden w-14 h-12  ${
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
                width={50}
                height={50}
                className="rounded-full object-contain"
              />
            </div>
            <input
              type="text"
              value={inputValue}
              disabled={!loggedIn}
              placeholder={
                loggedIn
                  ? "Co u Ciebie słychać?"
                  : "Zaloguj się, aby pisać posty."
              }
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-full ml-4 bg-contrast-posts border-2  border-border-dark rounded-full px-10  text-white font-semibold placeholder:text-text-chill placeholder:font-normal   hover:cursor-pointer focus:outline-none focus:border-brand-accent"
            ></input>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-[1px] text-2xl ease-in duration-100 bg-contrast-posts rounded-md px-4">
              <button
                className="hover:scale-[1.07]  ease-in duration-100"
                onClick={() => addEmojiToInput(event, 1)}
              >
                &#x1F525;
              </button>
              <button
                className="hover:scale-[1.07]  ease-in duration-100"
                onClick={() => addEmojiToInput(event, 2)}
              >
                &#x1F44D;
              </button>
              <button
                className="hover:scale-[1.07]  ease-in duration-100"
                onClick={() => addEmojiToInput(event, 3)}
              >
                &#x1F604;
              </button>
              <button
                className="hover:scale-[1.07]  ease-in duration-100"
                onClick={() => addEmojiToInput(event, 4)}
              >
                &#x1F496;
              </button>
            </div>
            <button
              type="submit"
              className="bg-brand-accent px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100"
            >
              Opublikuj{" "}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AddPost;
