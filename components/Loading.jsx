import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({classes, size}) => {
  return (
    <div className={"h-full grid place-content-center ".concat(classes)}>
      <div className="inline-block animate-spin">
        <IconContext.Provider
          value={{ color: "white", size: `${size}px` }}
        >
          <AiOutlineLoading3Quarters />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Loading;
