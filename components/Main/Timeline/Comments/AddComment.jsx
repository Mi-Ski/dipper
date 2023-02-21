import React, { useEffect, useLayoutEffect, useState } from "react";
import Loading from "../../../Loading";
import Image from "next/image";
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";

const AddComment = ({ user, addCommentHandler, loading }) => {
  const [inputValue, setInputValue] = useState("");
  // loading = true;

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "1px"; // Reset the height to minimum value
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the calculated scroll height
  };
  // useEffect(() => {
  // 	inputHandler("");
  // })

  return (
    <div className="mt-6 flex flex-col gap-x-4">
      <div className="flex gap-x-3">
        <div className="rounded-full overflow-hidden drop-shadow-[0px_10px_10px_#000]">
          <Image
            placeholder="blur"
            blurDataURL="https://via.placeholder.com/150"
            src={user.picture}
            alt="User Avatar"
            title={user.name}
            width={32}
            height={32}
            className="rounded-full "
          />
        </div>
        <textarea
          className="  bg-contrast-posts p-3 rounded-md flex-1 "
          placeholder="Twój komentarz"
          onInput={inputHandler}
          value={inputValue}
          // 1.5rem = line height p-1 = 0.25rem
          style={{ height: "3rem" }}
        ></textarea>
        {loading ? (
          <Loading classes=" w-5 h-5" />
        ) : (
          <button
            className={`${inputValue.length > 1 ? "bg-brand-accent" : "bg-border-dark"}  px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100  inline-block`}
            onClick={() => addCommentHandler(inputValue)}
          >
            <IconContext.Provider
              value={{ color: "white", size: `20px` }}
            >
              <IoIosSend />
            </IconContext.Provider>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddComment;
