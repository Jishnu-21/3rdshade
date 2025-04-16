'use client';

import { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { IoSettingsOutline, IoTrashOutline, IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<{ id: string; title: string; }[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const clearConversations = () => {
    setConversations([]);
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out pt-[100px] ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <div className="flex flex-col h-full">
          {/* New Chat Button */}
          <button
            className={`mx-4 p-3 rounded-lg ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            New Chat
          </button>

          {/* Conversations List */}
          <div className="flex-grow overflow-y-auto mt-4">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`w-full p-3 text-left hover:${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                } transition-colors truncate`}
              >
                {conv.title}
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <button
              onClick={clearConversations}
              className={`flex items-center gap-2 p-2 rounded-lg w-full ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-200'
              } transition-colors`}
            >
              <IoTrashOutline />
              Clear conversations
            </button>
            <button
              className={`flex items-center gap-2 p-2 rounded-lg w-full mt-2 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-200'
              } transition-colors`}
            >
              <IoSettingsOutline />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed left-0 top-[100px] z-10 p-2 rounded-r-lg ${
          theme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700' 
            : 'bg-gray-200 hover:bg-gray-300'
        } transition-colors`}
      >
        {isSidebarOpen ? <IoChevronBack /> : <IoChevronForward />}
      </button>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
}