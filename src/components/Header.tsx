import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <User className="mr-2 h-5 w-5" />
              Profile
            </button>
            <button
              onClick={logout}
              type="button"
              className="flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}