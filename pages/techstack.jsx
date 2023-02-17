import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Main/Header";

const techstack = () => {
  return (
    <Layout>
        <Header />
      <div className="z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl font-bold">Tech Stack</h1>
        <p className="text-xl">This is the tech stack page</p>
      </div>
    </Layout>
  );
};

export default techstack;
