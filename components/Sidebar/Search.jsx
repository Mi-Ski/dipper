import React, { useState, useContext } from "react";

import PostsContext from "../../context/PostContext";

import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";


const Search = () => {
  const [inputActive, setInputActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { setPosts } = useContext(PostsContext);

	const handleSearch = async (e) => {
    const term = e.currentTarget.value;
    setSearchValue(e.currentTarget.value);

    if (term.length > 2 || term.length === 0) {
      const getFilteredTweets = await fetch(`/api/tweets/${term}`);
      const getFilteredTweetsJson = await getFilteredTweets.json();
      setPosts(getFilteredTweetsJson);
    }
	}

  return (
    <div
      className={`${
        inputActive && "drop-shadow-input ring-2 ring-border-neon"
      } flex rounded-md overflow-hidden  dark:bg-bgcol-ui-dark border-2  border-border-dark border-solid lg:max-w-[92%] mx-auto 2xl:max-w-[100%]`}
    >
      <div className="hidden lg:grid place-items-center bg-border-dark  2xl:py-5 px-3">
        <IconContext.Provider
          value={{ color: "white", size: "20px" }}
>
          <BsSearch />
        </IconContext.Provider>
      </div>
      <div className=" flex-1 ">
        <input
          onFocus={() => {
            setInputActive(true);
          }}
          onBlur={() => setInputActive(false)}
          type="text"
          placeholder="Szukaj wpisów..."
					value={searchValue}
					onChange={handleSearch}
          className="bg-transparent w-full h-full font-semibold dark:font-normal dark:text-white py-3 px-2 2xl:py-5 2xl:px-5 focus:outline-none text-xs lg:text-sm 2xl:text-base "
        />
      </div>
    </div>
  );
};

export default Search;
