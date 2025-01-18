import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;