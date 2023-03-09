import React from "react";

const SkeletonLoad = () => {
  return (
    <>
      <div className="border md:border-2 border-border-dark shadow rounded-2xl md:rounded-sm  py-8  w-[98%] lg:w-full  mx-auto bg-bgcol-ui-light dark:bg-bgcol-ui-dark mb-8">
        <div className="animate-pulse flex space-x-4 px-8 pb-8 mb-8 border md:border-b-2 border border-border-dark border-t-0 border-x-0">
          <div
            className="rounded-full bg-border-dark
				 h-14 w-14"
          ></div>
          <div className="flex-1 space-y-8 py-1">
            <div
              className="h-4 rounded-full bg-border-dark
					 "
            ></div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-2"
                ></div>
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-1"
                ></div>
              </div>
              <div
                className="h-4 rounded-full bg-border-dark
						 "
              ></div>
            </div>
          </div>
          <div
            className="h-4 rounded-full bg-border-dark
					 "
          ></div>
        </div>
        <div className="animate-pulse flex space-x-4 px-4">
          <div className="flex-1 space-y-8 py-1">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-2"
                ></div>
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-1"
                ></div>
              </div>
              <div
                className="h-4 rounded-full bg-border-dark
						 "
              ></div>
            </div>
          </div>
          <div
            className="h-4 rounded-full bg-border-dark
					 "
          ></div>
        </div>
      </div>
      <div className="border md:border-2 border-border-dark shadow rounded-2xl md:rounded-sm  py-8  w-[98%] lg:w-full  mx-auto bg-bgcol-ui-light dark:bg-bgcol-ui-dark mb-8">
        <div className="animate-pulse flex space-x-4 px-8 pb-8 mb-8 border md:border-b-2 border border-border-dark border-t-0 border-x-0">
          <div
            className="rounded-full bg-border-dark
				 h-14 w-14"
          ></div>
          <div className="flex-1 space-y-8 py-1">
            <div
              className="h-4 rounded-full bg-border-dark
					 "
            ></div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-2"
                ></div>
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-1"
                ></div>
              </div>
              <div
                className="h-4 rounded-full bg-border-dark
						 "
              ></div>
            </div>
          </div>
          <div
            className="h-4 rounded-full bg-border-dark
					 "
          ></div>
        </div>
        <div className="animate-pulse flex space-x-4 px-4">
          <div className="flex-1 space-y-8 py-1">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-2"
                ></div>
                <div
                  className="h-4 rounded-full bg-border-dark
							  col-span-1"
                ></div>
              </div>
              <div
                className="h-4 rounded-full bg-border-dark
						 "
              ></div>
            </div>
          </div>
          <div
            className="h-4 rounded-full bg-border-dark
					 "
          ></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoad;
