import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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

interface InwardFormData {
  jobId: string;
  materialName: string;
  quantity: number;
  unit: string;
  receivedDate: string;
  supplierName: string;
  invoiceNumber: string;
  remarks: string;
}

const initialFormData: InwardFormData = {
  jobId: '',
  materialName: '',
  quantity: 0,
  unit: '',
  receivedDate: '',
  supplierName: '',
  invoiceNumber: '',
  remarks: ''
};

export function Inward() {
  const [entries, setEntries] = useState<InwardEntry[]>(mockInwardEntries);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<InwardFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setEntries(entries.map(entry =>
        entry.id === editingId
          ? {
            ...entry,
            ...formData,
            updatedAt: new Date().toISOString()
          }
          : entry
      ));
    } else {
      const newEntry: InwardEntry = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEntries([...entries, newEntry]);
    }
    setShowForm(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleEdit = (entry: InwardEntry) => {
    setFormData({
      jobId: entry.jobId,
      materialName: entry.materialName,
      quantity: entry.quantity,
      unit: entry.unit,
      receivedDate: entry.receivedDate,
      supplierName: entry.supplierName,
      invoiceNumber: entry.invoiceNumber,
      remarks: entry.remarks || ''
    });
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Inward Entry</h1>
          <button
            onClick={() => {
              setFormData(initialFormData);
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </button>
        </div>

        {showForm && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Inward Entry' : 'Create New Inward Entry'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job
                </label>
                <select
                  value={formData.jobId}
                  onChange={e => setFormData({ ...formData, jobId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a job</option>
                  {mockJobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Material Name
                </label>
                <input
                  type="text"
                  value={formData.materialName}
                  onChange={e => setFormData({ ...formData, materialName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    required
                    placeholder="e.g., pieces, kg, meters"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Received Date
                </label>
                <input
                  type="date"
                  value={formData.receivedDate}
                  onChange={e => setFormData({ ...formData, receivedDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={e => setFormData({ ...formData, supplierName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  rows={3}
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
                  {editingId ? 'Update Entry' : 'Create Entry'}
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
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.materialName}</div>
                    <div className="text-sm text-gray-500">{mockJobs.find(j => j.id === entry.jobId)?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.quantity} {entry.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.receivedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.supplierName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
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