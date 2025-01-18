import React, { useState } from 'react';
import { Plus, Pencil, Trash2, MoreVertical } from 'lucide-react';
import type { Job } from '../types';

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
  },
  {
    id: '2',
    name: 'Mobile App Development',
    type: 'Development',
    status: 'pending',
    dueDate: '2024-04-15',
    assignedTo: 'Jane Smith',
    createdAt: '2024-03-02',
    updatedAt: '2024-03-02'
  },
  {
    id: '3',
    name: 'Database Migration',
    type: 'Infrastructure',
    status: 'completed',
    dueDate: '2024-03-10',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-02-25',
    updatedAt: '2024-03-10'
  }
];

interface JobFormData {
  name: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  assignedTo: string;
}

const initialFormData: JobFormData = {
  name: '',
  type: '',
  status: 'pending',
  dueDate: '',
  assignedTo: ''
};

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setJobs(jobs.map(job => 
        job.id === editingId 
          ? { 
              ...job, 
              ...formData, 
              updatedAt: new Date().toISOString() 
            } 
          : job
      ));
    } else {
      const newJob: Job = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setJobs([...jobs, newJob]);
    }
    setShowForm(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleEdit = (job: Job) => {
    setFormData({
      name: job.name,
      type: job.type,
      status: job.status,
      dueDate: job.dueDate,
      assignedTo: job.assignedTo || ''
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
          <button
            onClick={() => {
              setFormData(initialFormData);
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Job
          </button>
        </div>

        {showForm && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Job' : 'Create New Job'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as Job['status'] })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData(initialFormData);
                    setEditingId(null);
                  }}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  {editingId ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map(job => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}