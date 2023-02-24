import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Main/Header";
import MobileOverlay from "../components/Mobile/MobileOverlay";

const techstack = () => {
  return (
    <>
      <Layout>
      <MobileOverlay techStackPageActive={true} />
        <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center">
          <h1 className="text-4xl font-bold mt-10">Tech Stack</h1>
          <p className="text-xl mt-10">
            Technologie z jakich korzystałem budując tą aplikację
          </p>
          <p className="text-xl mt-10">
            React, Next.js, MongoDB, Vercel, GitHub, OVHcloud, Stable
            Diffusion, Google Cloud Storage (??)
          </p>
        </div>
      </Layout>
    </>
  );
};

export default techstack;
