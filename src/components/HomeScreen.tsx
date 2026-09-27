import React from 'react';
import { ChecklistItem, CategoryGroup } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface HomeScreenProps {
  checklists: ChecklistItem[];
  onSelectList: (list: ChecklistItem) => void;
  onAddNew: () => void;
  onDeleteList: (id: string) => void;
  getTimeUntilReset: (list: ChecklistItem) => string | null;
}

export function HomeScreen({
  checklists,
  onSelectList,
  onAddNew,
  onDeleteList,
  getTimeUntilReset,
}: HomeScreenProps) {
  const groupedByCategory: Record<string, ChecklistItem[]> = {};

  checklists.forEach(list => {
    if (!groupedByCategory[list.category]) {
      groupedByCategory[list.category] = [];
    }
    groupedByCategory[list.category].push(list);
  });

  const categories = Object.keys(groupedByCategory).sort();

  const getProgress = (list: ChecklistItem) => {
    if (list.items.length === 0) return '0/0';
    const completed = list.items.filter(item => item.completed).length;
    return `${completed}/${list.items.length}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 safe-area-inset-top">
        <h1 className="text-3xl font-bold mb-2">Checklists</h1>
        <p className="text-indigo-100">Organize your daily routines</p>
      </div>

      <div className="p-4">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No checklists yet</p>
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700"
            >
              <Plus size={20} />
              Create First Checklist
            </button>
          </div>
        ) : (
          categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">{category}</h2>
              <div className="space-y-2">
                {groupedByCategory[category].map(list => {
                  const timeUntilReset = getTimeUntilReset(list);
                  const progress = getProgress(list);

                  return (
                    <div
                      key={list.id}
                      onClick={() => onSelectList(list)}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 active:bg-gray-50 cursor-pointer flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{list.name}</h3>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                          <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded">
                            {progress}
                          </span>
                          {list.type === 'instant-reset' && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Auto-reset
                            </span>
                          )}
                          {list.type === 'interval-reset' && timeUntilReset && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                              Resets in {timeUntilReset}
                            </span>
                          )}
                          {list.type === 'one-time' && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              One-time
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete "${list.name}"?`)) {
                            onDeleteList(list.id);
                          }
                        }}
                        className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={onAddNew}
        className="fixed bottom-8 right-4 safe-area-inset-bottom bg-fuchsia-600 text-white rounded-full p-4 shadow-lg hover:bg-fuchsia-700 active:bg-fuchsia-800 z-40"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
