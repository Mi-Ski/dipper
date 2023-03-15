import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Main/Header";
import MobileOverlay from "../components/Mobile/MobileOverlay";

const techstack = () => {
  return (
    <>
      <Layout routed={true}>
          <Header routed={true}/>
          <MobileOverlay techStackPageActive={true} />
          <div className="z-10 min-h-[101vh] px-8 my-20 max-w-3/5  flex flex-col items-center justify-center  h-full text-center">
            <p className="text-xl mt-10">
              Technologie z jakich korzystałem budując tę aplikację
            </p>
            <p className="text-xl mt-10">
              React, Next.js, MongoDB, WebSockets, RxJS, Tailwind CSS,
              Vercel, GitHub, OVHcloud, Stable Diffusion,
              DigitalOcean
            </p>
          </div>
      </Layout>
    </>
  );
};

export default techstack;
