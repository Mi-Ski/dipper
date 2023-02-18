import React, { useState, useEffect } from "react";
import MobileOverlayTop from "./MobileOverlayTop";
import MobileOverlayBottom from "./MobileOverlayBottom";

const MobileOverlay = () => {
  const [topBlobShown, setTopBlobShown] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

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

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollPosition]);



  return (
    <div className="block pointer-events-none md:hidden fixed flex flex-col h-full justify-between z-[10]">
      {topBlobShown ? <MobileOverlayTop /> : <div></div>}
      <MobileOverlayBottom />
    </div>
  );
};

export default MobileOverlay;
