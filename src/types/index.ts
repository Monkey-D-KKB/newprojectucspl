export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator';
  createdAt: string;
}

export interface Job {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  inProgressJobs: number;
}

export interface InwardEntry {
  id: string;
  jobId: string;
  materialName: string;
  quantity: number;
  unit: string;
  receivedDate: string;
  supplierName: string;
  invoiceNumber: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PressureGaugeReading {
  id: string;
  inwardEntryId: string;
  readingDate: string;
  pressure: number;
  temperature: number;
  humidity: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}