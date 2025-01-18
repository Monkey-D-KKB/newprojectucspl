import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileInput,
  FileSpreadsheet,
  Search,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Users', to: '/users', icon: Users },
  { name: 'Jobs', to: '/jobs', icon: Briefcase },
  { name: 'Inward Entry', to: '/inward', icon: FileInput },
  { name: 'Datasheet', to: '/datasheet', icon: FileSpreadsheet },
  { name: 'Search', to: '/search', icon: Search },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-xl font-bold text-white">Job Management</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.to}
              className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}