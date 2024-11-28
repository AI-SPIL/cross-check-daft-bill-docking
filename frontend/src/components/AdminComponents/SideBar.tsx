import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { to: "/", 
    label: "Home",
    icon: <HomeIcon className="h-6 w-6" />
   },
  {
    to: "/edit",
    label: "Edit",
    icon: <UsersIcon className="h-6 w-6" />,
  },
  {
    to: "/comingsoon",
    label: "ComingSoon",
    icon: <CogIcon className="h-6 w-6" />,
  },
];

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`bg-gray-800 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 relative`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4">
        <CakeIcon className="h-8 w-8 text-white" />
        {isOpen && (
          <span className="text-white ml-2 text-lg font-semibold">SPIL</span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-2" />

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-gray-600 text-white p-2 rounded-full focus:outline-none"
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-6 w-6" />
        ) : (
          <ChevronRightIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar Menu Items */}
      <ul className="space-y-2 p-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="text-white block py-2 px-2 hover:bg-gray-700 rounded flex items-center gap-x-2"
            >
              {item.icon}
              {isOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
