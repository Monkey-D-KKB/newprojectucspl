import React from 'react';
import { DashboardStats } from '../components/DashboardStats';

const mockStats = {
  totalJobs: 150,
  completedJobs: 95,
  pendingJobs: 35,
  inProgressJobs: 20,
};

export function Dashboard() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <DashboardStats stats={mockStats} />
      </div>
    </div>
  );
}