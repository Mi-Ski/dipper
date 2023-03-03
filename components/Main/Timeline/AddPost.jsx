import React, { useState, useContext } from "react";
import { useUser } from "../../../context/UserContext";
import PostsContext from "../../../context/PostContext";
import Image from "next/image";
import WebsocketContext from "../../../context/WebsocketContext";
import Loading from "../../Loading";

import { useRouter } from "next/router";

const AddPost = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const { setPosts } = useContext(PostsContext);
  const { socket } = useContext(WebsocketContext);
  const user = useUser();
  const loggedIn = Boolean(user.id);
  const router = useRouter();

  const logIn = async () => {
    router.push("/api/auth/login");
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    setInputLength(e.target.value.length);
    e.target.style.height = "1px"; // Reset the height to minimum value
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the calculated scroll height
  };

  const onSubmitTweet = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!loggedIn) {
      logIn();
    } else if (inputValue.trim().length < 1) {
      return;
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

      socket.next({
        type: "NEW_POST",
        actionOwner: {
          name: user.nickname,
          picture: user.picture,
          id: user?.id,
        },
        post: {
          user: user,
        },
        time: 5000,
        key: Math.random(),
      });

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
      setLoading(false);
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
    <div className="w-full flex flex-col px-2 mb-10 pt-10 pb-4 md:px-4 2xl:px-10 bg-slate-300  dark:bg-bgcol-ui-dark md:rounded shadow-lg shadow-black/[.55] md:border-2 md:border-border-dark relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-neon-accent2-opaque to-brand-accent absolute w-full top-0 left-0"></div>
      <form onSubmit={onSubmitTweet} className="w-full">
        <div className="flex flex-col space-y-5">
					<div className="flex flex-col">
					<div className="flex items-start min-h-14 space-x-2">
            <div
              className={`flex items-center justify-ter  rounded-full relative   w-14 min-w-[50px] min-h-12  ${
                user.picture ? "" : "border-2 border-border-dark"
              }`}
            >
              <Image
                src={
                  user.picture
                    ? user.picture
                    : "/profilepic-placeholder.png"
                }
                alt="User Avatar"
                title={user.name}
                width="50"
                height="50"
                className="rounded-full object-contain"
              />
            </div>

            <textarea
              className="transition-all duration-100 ease-in-out block outline-none  focus:outline-2   focus:outline-neon-accent-opaque  bg-contrast-posts  px-4 py-3 rounded-md flex-1 min-h-[3rem] font-bold outline-[2px] outline-border-dark px-4"
              placeholder={
                loggedIn
                  ? "Co u Ciebie słychać?"
                  : "Zaloguj się, aby pisać posty."
              }
              onInput={inputHandler}
              value={inputValue}
              maxLength={280}
              // 1.5rem = line height p-1 = 0.25rem
              style={{ height: "3rem" }}
            ></textarea>
          </div>
          <p className={`place-self-end py-2 pr-1 text-textcol-main-dark ${inputLength < 280 ? "text-textcol-main-dark font-normal" : "text-red-500 font-semibold"}`}>{inputLength} / 280</p>
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
              className="bg-gradient-to-r min-w-[9em] from-neon-accent-opaque to-brand-accent px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100"
            >
              {loggedIn && !loading && "Opublikuj"}
              {loggedIn && loading && <Loading size="24" />}
              {!loggedIn && "Zaloguj się"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
