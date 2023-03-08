import React from "react";

const Card = ({ children, classes }) => {
  return (
    <div
      className={
        "w-full flex flex-col bg-bgcol-ui-light border-border-dark border-solid dark:bg-bgcol-ui-dark  mb-10  rounded-2xl md:rounded " +
        classes.join(" ")
      }
    >
      {children}
    </div>
  );
};

export default Card;
