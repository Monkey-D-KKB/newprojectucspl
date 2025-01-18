import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { FileText, ArrowRight } from 'lucide-react';
import type { InwardEntry, Job } from '../types';

const mockJobs: Job[] = [
  {
    id: '1',
    name: 'Website Redesign',
    type: 'Design',
    status: 'in_progress',
    dueDate: '2024-03-20',
    assignedTo: 'John Doe',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05'
  }
];

const mockInwardEntries: InwardEntry[] = [
  {
    id: '1',
    jobId: '1',
    materialName: 'Steel Plates',
    quantity: 50,
    unit: 'pieces',
    receivedDate: '2024-03-15',
    supplierName: 'Steel Corp Ltd',
    invoiceNumber: 'INV-2024-001',
    remarks: 'Grade A quality',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  }
];

export function Datasheet() {
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  const filteredEntries = selectedJobId
    ? mockInwardEntries.filter(entry => entry.jobId === selectedJobId)
    : mockInwardEntries;

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Datasheets</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Job
          </label>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="">All Jobs</option>
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-indigo-600" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {entry.materialName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {mockJobs.find(j => j.id === entry.jobId)?.name}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                      <dd className="mt-1 text-sm text-gray-900">{entry.quantity} {entry.unit}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Received Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(entry.receivedDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Supplier</dt>
                      <dd className="mt-1 text-sm text-gray-900">{entry.supplierName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Invoice</dt>
                      <dd className="mt-1 text-sm text-gray-900">{entry.invoiceNumber}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6">
                  <Link
                    to="/datasheet/$inwardId"
                    params={{ inwardId: entry.id }}
                    className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    View Pressure Gauge Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}