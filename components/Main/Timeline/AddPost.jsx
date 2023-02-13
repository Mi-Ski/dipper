import React, { useState, useContext } from "react";
import { useUser } from "../../../context/UserContext";
import PostsContext from "../../../context/PostContext";
import Card from "../../Card";
import Image from "next/image";

const AddPost = () => {
  const [inputValue, setInputValue] = useState("");
  const { setPosts } = useContext(PostsContext);
  const user = useUser();
  const loggedIn = Boolean(user.id);

  const onSubmitTweet = async (event) => {
    event.preventDefault();
    console.log(user);
    // setInputDisabled(true);
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
    // setInputDisabled(false);
    // showSuccess();
  };

  const addEmojiToInput = (event, emojiCode) => {
    event.preventDefault();
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
    <Card classes={["p-10"]}>
      <form onSubmit={onSubmitTweet} className="w-full">
        <div className="flex flex-col">
          <div className="flex">
            <div className="rounded-full overflow-hidden h-full">
              <Image
                placeholder="blur"
                blurDataURL="https://via.placeholder.com/150"
                src={user.picture ? user.picture : "/profilepic-placeholder.png"}
                alt="User Avatar"
                title={user.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <input
              type="text"
              value={inputValue}
              disabled={!loggedIn}
              placeholder={
                loggedIn
                  ? "Twoja wiadomość"
                  : "Zaloguj się aby pisać posty"
              }
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full mx-7 rounded-full px-10 text-white font-semiold placeholder:text-text-chill placeholder:font-normal bg-post-input-bg"
            ></input>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <button onClick={() => addEmojiToInput(event, 1)}>
                &#x1F525;
              </button>
              <button onClick={() => addEmojiToInput(event, 2)}>
                &#x1F44D;
              </button>
              <button onClick={() => addEmojiToInput(event, 3)}>
                &#x1F604;
              </button>
              <button onClick={() => addEmojiToInput(event, 4)}>
                &#x1F496;
              </button>
            </div>
            <button
              type="submit"
              className="bg-button-post px-5 py-2 rounded-full font-bold hover:scale-[1.02] ease-in duration-100"
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
