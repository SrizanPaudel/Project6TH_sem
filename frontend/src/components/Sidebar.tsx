import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 p-4">
      <div className="sticky top-20 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[200px]">
        {user ? (
          <>
            <h2 className="text-xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-600 text-center">Use the Preferences button to filter news by category, or see all news by default.</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Welcome to Kura-Kani!</h2>
            <p className="text-gray-600 text-center mb-4">Sign in to customize your news preferences and get personalized content.</p>
            <div className="flex flex-col space-y-2 w-full">
              <Link 
                to="/login" 
                className="bg-orange-600 text-white px-4 py-2 rounded-md text-center hover:bg-orange-700 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-center hover:bg-gray-300 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;