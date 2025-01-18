import React from 'react';
import type { DashboardStats } from '../types';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${color}`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface Props {
  stats: DashboardStats;
}

export function DashboardStats({ stats }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Jobs"
        value={stats.totalJobs}
        icon={<Briefcase className="h-6 w-6 text-blue-600" />}
        color="bg-blue-100"
      />
      <StatsCard
        title="Completed Jobs"
        value={stats.completedJobs}
        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        color="bg-green-100"
      />
      <StatsCard
        title="In Progress"
        value={stats.inProgressJobs}
        icon={<Clock className="h-6 w-6 text-yellow-600" />}
        color="bg-yellow-100"
      />
      <StatsCard
        title="Pending Jobs"
        value={stats.pendingJobs}
        icon={<AlertCircle className="h-6 w-6 text-red-600" />}
        color="bg-red-100"
      />
    </div>
  );
}