import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { ArrowLeft, Plus, Trash2, Settings, RotateCcw } from 'lucide-react';

interface ListDetailScreenProps {
  list: ChecklistItem;
  onBack: () => void;
  onToggleItem: (itemId: string) => void;
  onAddItem: (text: string) => void;
  onRemoveItem: (itemId: string) => void;
  onResetList: () => void;
  onEdit: () => void;
}

export function ListDetailScreen({
  list,
  onBack,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onResetList,
  onEdit,
}: ListDetailScreenProps) {
  const [newItemText, setNewItemText] = useState('');
  const [showCompletedConfirm, setShowCompletedConfirm] = useState(false);

  const completedCount = list.items.filter(item => item.completed).length;
  const isFullyCompleted = completedCount === list.items.length && list.items.length > 0;

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(newItemText.trim());
      setNewItemText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 safe-area-inset-top flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{list.name}</h1>
            <p className="text-indigo-100 text-sm">{completedCount}/{list.items.length} done</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <Settings size={24} />
        </button>
      </div>

      {isFullyCompleted && !showCompletedConfirm && (
        <div className="bg-green-50 border-b border-green-200 p-4">
          <p className="text-green-800 font-medium text-center">✓ All items completed!</p>
        </div>
      )}

      <div className="p-4">
        <div className="space-y-2 mb-6">
          {list.items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No items yet. Add one to get started!</p>
          ) : (
            list.items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleItem(item.id)}
                  className="w-6 h-6 rounded accent-indigo-600 cursor-pointer"
                />
                <span
                  className={`flex-1 text-lg ${
                    item.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="Add new item..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleAddItem}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 font-medium"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onResetList}
            className="flex-1 bg-orange-100 text-orange-700 px-4 py-3 rounded-lg font-medium hover:bg-orange-200 flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Reset Now
          </button>
        </div>
      </div>
    </div>
  );
}
