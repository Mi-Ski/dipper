import React, { useState, useContext } from "react";
import { useUser } from "../../../context/UserContext";
import PostsContext from "../../../context/PostContext";
import { setPosts } from "../../../context/PostContext";
import Card from "../../Card";

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

  const handler = (event) => {
    event.preventDefault();
    console.log("hello");
  };

  return (
    <Card classes={["p-10"]}>
      <form onSubmit={onSubmitTweet} className="w-full">
        <div className="flex flex-col">
          <div className="flex">
            <div>Picture</div>
            <input
              type="text"
              value={inputValue}
              placeholder="your tweet here"
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div>emoji</div>
              <div>emoji</div>
              <div>emoji</div>
              <div>emoji</div>
            </div>
            <button type="submit">Tweet</button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AddPost;
