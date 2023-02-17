import React from "react";
import MobileOverlayTop from "./MobileOverlayTop";
import MobileOverlayBottom from "./MobileOverlayBottom";

const MobileOverlay = () => {

  return (
    <div className="block pointer-events-none md:hidden fixed flex flex-col h-full justify-between z-[10]">
			<MobileOverlayTop />
			<MobileOverlayBottom />
    </div>
  );
};

export default MobileOverlay;
