import { useState, useEffect } from "react";
import MobileOverlayTop from "./MobileOverlayTop";
import MobileOverlayBottom from "./MobileOverlayBottom";

const MobileOverlay = () => {
  const [topBlobShown, setTopBlobShown] = useState(false);
  const [expandMenus, setExpandMenus] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const clickHanlder = () => {
    setExpandMenus(!expandMenus);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      if (position > 200) {
        setTopBlobShown(true);
      } else {
        setTopBlobShown(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className="block pointer-events-none md:hidden fixed flex flex-col h-full justify-between w-screen items-end z-[10]">
      {topBlobShown || expandMenus ? (
        <MobileOverlayTop
          clickHandler={clickHanlder}
          expanded={expandMenus}
        />
      ) : <div></div>}
      <MobileOverlayBottom expanded={expandMenus}/>
    </div>
  );
};

export default MobileOverlay;
