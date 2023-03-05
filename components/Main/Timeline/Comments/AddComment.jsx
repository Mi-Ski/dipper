import React, { useState, useRef } from "react";
import Loading from "../../../Loading";
import Image from "next/image";
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";

const AddComment = ({ user, addCommentHandler, loading }) => {
  const [inputValue, setInputValue] = useState("");
	const textareaRef = useRef(null);

  const submitCommentHanlder = () => {
    if (inputValue.length === 0) return;
    setInputValue("");
    addCommentHandler(inputValue);
		textareaRef.current.style.height = "1.5rem";
  };

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "1px"; // Reset the height to minimum value
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the calculated scroll height
		if (e.target.value === "") {
			e.target.style.height = "1.5rem";
		}
  };

  return (
    <div className="mt-6 px-4 flex flex-col gap-x-4">
      <div className="flex gap-x-3 items-center">
        <div
          className={`rounded-full relative  overflow-hidden w-14 max-w-[36px] h-9  ${
            user.picture
              ? ""
              : "border-[1px] md:border-2 border-border-dark"
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
					ref={textareaRef}
          className="overflow-y-hidden transition-all duration-100 ease-in-out block rounded-md flex-1 bg-contrast-posts px-4 py-3  min-h-[3rem] 
					
								// OUTLINE STYLES
								  outline-none md:outline-[1px]    md:outline-border-dark focus:outline-none  md:focus:outline-[1px]   md:focus:outline-neon-accent-opaque 
								
								// BORDER STYLES
								border-[1px] border-border-dark focus:border-neon-accent-opaque  md:border-none"
          placeholder={"Twój komentarz"}
          onInput={inputHandler}
          value={inputValue}
          // 1.5rem = line height p-1 = 0.25rem
          style={{ height: "3rem" }}
        ></textarea>
        <button
          className={`${
            inputValue.length > 0
              ? "bg-brand-accent"
              : "bg-border-dark"
          }  px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100  inline-block`}
          onClick={() => submitCommentHanlder()}
        >
          {loading ? (
            <Loading size={20} />
          ) : (
            <IconContext.Provider
              value={{ color: "white", size: `20px` }}
            >
              <IoIosSend />
            </IconContext.Provider>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
