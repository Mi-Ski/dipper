import React from "react";

const Card = ({ children, classes }) => {
  return (
    <div
      className={
        "w-full flex flex-col bg-slate-300  border-border-dark border-solid dark:bg-bgcol-ui-dark  mb-10  rounded-2xl md:rounded-sm " +
        classes.join(" ")
      }
    >
      {children}
    </div>
  );
};

export default Card;
