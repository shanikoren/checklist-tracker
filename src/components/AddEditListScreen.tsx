import React, { useState, useEffect } from 'react';
import { ChecklistItem, ListType, IntervalUnit } from '../types';
import { ArrowLeft, Save } from 'lucide-react';

interface AddEditListScreenProps {
  list?: ChecklistItem;
  onBack: () => void;
  onSave: (name: string, category: string, type: ListType, intervalValue?: number, intervalUnit?: IntervalUnit) => void;
}

const categories = ['Morning', 'Work', 'Evening', 'Errands', 'Health', 'Hobbies', 'Other'];

export function AddEditListScreen({ list, onBack, onSave }: AddEditListScreenProps) {
  const [name, setName] = useState(list?.name || '');
  const [category, setCategory] = useState(list?.category || 'Morning');
  const [type, setType] = useState<ListType>(list?.type || 'one-time');
  const [intervalValue, setIntervalValue] = useState(
    list?.type === 'interval-reset' && list.intervalHours
      ? list.intervalHours % 24 === 0
        ? list.intervalHours / 24
        : list.intervalHours
      : 24
  );
  const [intervalUnit, setIntervalUnit] = useState<IntervalUnit>(
    list?.type === 'interval-reset' && list.intervalHours && list.intervalHours % 24 === 0
      ? 'days'
      : 'hours'
  );
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a list name');
      return;
    }

    const finalIntervalValue = type === 'interval-reset' ? intervalValue : undefined;
    const finalIntervalUnit = type === 'interval-reset' ? intervalUnit : undefined;

    onSave(name.trim(), category, type, finalIntervalValue, finalIntervalUnit);
  };

  const isEditing = !!list;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4 safe-area-inset-top flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-blue-700 rounded-lg">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit List' : 'New List'}</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">List Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g. Morning Routine"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-3">List Type</label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{ borderColor: type === 'instant-reset' ? '#2563eb' : '#e5e7eb' }}>
                <input
                  type="radio"
                  name="type"
                  value="instant-reset"
                  checked={type === 'instant-reset'}
                  onChange={() => setType('instant-reset')}
                  className="mt-1 accent-blue-600 cursor-pointer"
                />
                <div>
                  <p className="font-medium text-gray-800">Instant Reset</p>
                  <p className="text-sm text-gray-600">Clears automatically once all items are checked</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{ borderColor: type === 'interval-reset' ? '#2563eb' : '#e5e7eb' }}>
                <input
                  type="radio"
                  name="type"
                  value="interval-reset"
                  checked={type === 'interval-reset'}
                  onChange={() => setType('interval-reset')}
                  className="mt-1 accent-blue-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Interval Reset</p>
                  <p className="text-sm text-gray-600 mb-2">Resets every N hours or days</p>
                  {type === 'interval-reset' && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={intervalValue}
                        onChange={(e) => setIntervalValue(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={intervalUnit}
                        onChange={(e) => setIntervalUnit(e.target.value as IntervalUnit)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  )}
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{ borderColor: type === 'one-time' ? '#2563eb' : '#e5e7eb' }}>
                <input
                  type="radio"
                  name="type"
                  value="one-time"
                  checked={type === 'one-time'}
                  onChange={() => setType('one-time')}
                  className="mt-1 accent-blue-600 cursor-pointer"
                />
                <div>
                  <p className="font-medium text-gray-800">One-Time</p>
                  <p className="text-sm text-gray-600">Never resets automatically</p>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {isEditing ? 'Update List' : 'Create List'}
          </button>
        </div>
      </div>
    </div>
  );
}
