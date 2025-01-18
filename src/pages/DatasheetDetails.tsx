import React, { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { Save, ArrowLeft } from 'lucide-react';
import type { InwardEntry, PressureGaugeReading } from '../types';
import { Link } from '@tanstack/react-router';

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

const mockReadings: PressureGaugeReading[] = [
  {
    id: '1',
    inwardEntryId: '1',
    readingDate: '2024-03-16',
    pressure: 100,
    temperature: 25,
    humidity: 60,
    notes: 'Normal operating conditions',
    createdAt: '2024-03-16',
    updatedAt: '2024-03-16'
  }
];

interface ReadingFormData {
  readingDate: string;
  pressure: number;
  temperature: number;
  humidity: number;
  notes: string;
}

const initialFormData: ReadingFormData = {
  readingDate: new Date().toISOString().split('T')[0],
  pressure: 0,
  temperature: 0,
  humidity: 0,
  notes: ''
};

export function DatasheetDetails() {
  const { inwardId } = useParams({ from: '/datasheet/$inwardId' });
  const [formData, setFormData] = useState<ReadingFormData>(initialFormData);
  const [readings, setReadings] = useState<PressureGaugeReading[]>(mockReadings);

  const inwardEntry = mockInwardEntries.find(entry => entry.id === inwardId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReading: PressureGaugeReading = {
      id: Math.random().toString(36).substr(2, 9),
      inwardEntryId: inwardId,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReadings([...readings, newReading]);
    setFormData(initialFormData);
  };

  if (!inwardEntry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/datasheet"
            className="flex items-center text-indigo-600 hover:text-indigo-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Datasheets
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Pressure Gauge Details
          </h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Material</dt>
              <dd className="mt-1 text-sm text-gray-900">{inwardEntry.materialName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Quantity</dt>
              <dd className="mt-1 text-sm text-gray-900">{inwardEntry.quantity} {inwardEntry.unit}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Received Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(inwardEntry.receivedDate).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Reading</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reading Date
                </label>
                <input
                  type="date"
                  value={formData.readingDate}
                  onChange={e => setFormData({ ...formData, readingDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pressure (PSI)
                </label>
                <input
                  type="number"
                  value={formData.pressure}
                  onChange={e => setFormData({ ...formData, pressure: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={e => setFormData({ ...formData, temperature: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={e => setFormData({ ...formData, humidity: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Reading
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pressure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Humidity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {readings
                .filter(reading => reading.inwardEntryId === inwardId)
                .map(reading => (
                  <tr key={reading.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(reading.readingDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reading.pressure} PSI
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reading.temperature}°C
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reading.humidity}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {reading.notes}
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