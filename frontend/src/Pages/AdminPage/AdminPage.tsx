import React, { useState } from "react";
import { Sidebar } from "../../components/AdminComponents/SideBar";
import { Navbar } from "../../components/AdminComponents/Navbar";
import { MainContent } from "../../components/AdminComponents/MainContent";
export function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Content Area */}
        <MainContent />
      </div>
    </div>
  );
}
