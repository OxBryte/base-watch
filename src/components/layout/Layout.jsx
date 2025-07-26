import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="mx-auto w-full max-w-[960px] px-5 mt-5 flex-1 flex flex-col gap-7 sm:mt-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
