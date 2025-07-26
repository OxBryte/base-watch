import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="">
      <div className="mx-auto w-full max-w-[860px] px-5 mt-5 flex flex-col gap-7 pb-28 sm:mt-8 sm:pb-20">
        <Outlet />
      </div>
    </div>
  );
}
