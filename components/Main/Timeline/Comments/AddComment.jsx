import React, { useEffect, useLayoutEffect, useState } from "react";
import Loading from "../../../Loading";
import Image from "next/image";
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";

const AddComment = ({
  user,
  currentUser,
  addCommentHandler,
  loading,
}) => {
  const [inputValue, setInputValue] = useState("");
  // loading = true;

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "1px"; // Reset the height to minimum value
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the calculated scroll height
  };

  return (
    <div className="mt-6 px-4 flex flex-col gap-x-4">
      <div className="flex gap-x-3 items-center">
        <div
          className={`rounded-full relative  overflow-hidden w-14 max-w-[36px] h-9  ${
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
        <textarea
          className="  bg-contrast-posts px-4 py-3 rounded-md flex-1 min-h-[3rem]"
          placeholder={
            currentUser
              ? "Twój komentarz"
              : "Zaloguj się, aby komentować"
          }
          onInput={inputHandler}
          value={inputValue}
          // 1.5rem = line height p-1 = 0.25rem
          style={{ height: "3rem" }}
        ></textarea>
        {loading ? (
          <Loading classes=" w-5 h-5" />
        ) : (
          <button
            className={`${
              inputValue.length > 1
                ? "bg-brand-accent"
                : "bg-border-dark"
            }  px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100  inline-block`}
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
