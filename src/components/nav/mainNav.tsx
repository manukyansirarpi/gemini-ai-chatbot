"use client";
import { X, AlignJustify } from "lucide-react";
import { useState } from "react";
import ChatSessionList from "./chatSessionList";

const MainNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-20 md:hidden">
        <button onClick={toggleDrawer}>
          <AlignJustify />
        </button>
      </div>

      <div className="hidden md:block w-1/4 bg-gray-100 shadow-md  mb-8">
        <ChatSessionList />
      </div>

      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="w-3/4 max-w-sm bg-white h-full shadow-lg">
          <div className="p-4">
            <button onClick={toggleDrawer} className="text-black">
              <X />
            </button>
          </div>
          <ChatSessionList />
        </div>
      </div>
    </>
  );
};

export default MainNav;
