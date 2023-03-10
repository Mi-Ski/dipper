import React from "react";
import { IconContext } from "react-icons";

const BottomDrawerIcon = ({
  onClickAction,
  description,
  children,
}) => {
  return (
    <div
      onClick={onClickAction}
      className="flex-1 flex-col items-center justify-between align-center p-4 space-y-3 bg-gradient-to-r from-neon-accent-opaque to-brand-accent dark:bg-black/[.2] rounded-md"
    >
      <button>
        <IconContext.Provider
          value={{ color: "white", size: `20px` }}
        >
					{children}
        </IconContext.Provider>
      </button>
      <p className="text-xs text-textcol-main-dark min-h-[2em] text-[10px] text-text-chill">{description}</p>
    </div>
  );
};

export default BottomDrawerIcon;
