import React, { useState } from "react";
import Loading from "../../../Loading";

const AddComment = ({ user, addCommentHandler, loading }) => {
  const [inputValue, setInputValue] = useState("");
  // loading = true;

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "1px"; // Reset the height to minimum value
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the calculated scroll height
  };

  return (
    <div className="mt-6 flex flex-col gap-x-4">
      <div className="flex">
        <div>[foto]</div>
        <textarea
          className=" resize-none bg-contrast-posts h-[1.5em]"
          id="comment-area"
          placeholder="Twój komentarz"
          onInput={inputHandler}
          value={inputValue}
        ></textarea>
      </div>
      <div>
        <button
          className="bg-brand-accent px-5 py-2  rounded-md font-semibold hover:bg-brand-accent/[.85] ease-in duration-100 mx-auto inline-block"
          onClick={() => addCommentHandler(inputValue)}
        >
          Odpowiedz
        </button>
        {loading && <Loading classes=" w-5 h-5" />}
      </div>
    </div>
  );
};

export default AddComment;
