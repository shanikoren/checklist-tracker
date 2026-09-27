import React, { useState, useEffect } from 'react';
import { useChecklists } from './hooks/useChecklists';
import { ChecklistItem } from './types';
import { HomeScreen } from './components/HomeScreen';
import { ListDetailScreen } from './components/ListDetailScreen';
import { AddEditListScreen } from './components/AddEditListScreen';

type Screen = 'home' | 'detail' | 'add-edit';

export function App() {
  const checklists = useChecklists();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedList, setSelectedList] = useState<ChecklistItem | undefined>();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checklists.autoResetIntervalLists();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', () => checklists.autoResetIntervalLists());

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', () => checklists.autoResetIntervalLists());
    };
  }, [checklists]);

  if (!checklists.loaded) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const handleSelectList = (list: ChecklistItem) => {
    setSelectedList(list);
    setCurrentScreen('detail');
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedList(undefined);
  };

  const handleSaveList = (name: string, category: string, type: any, intervalValue?: number, intervalUnit?: any) => {
    if (selectedList) {
      checklists.updateChecklist(selectedList.id, { name, category, type });
    } else {
      checklists.addChecklist(name, category, type, intervalValue, intervalUnit);
    }
    setCurrentScreen('home');
    setSelectedList(undefined);
  };

  return (
    <div className="bg-gray-50">
      {currentScreen === 'home' && (
        <HomeScreen
          checklists={checklists.checklists}
          onSelectList={handleSelectList}
          onAddNew={() => {
            setSelectedList(undefined);
            setCurrentScreen('add-edit');
          }}
          onDeleteList={(id) => checklists.deleteChecklist(id)}
          getTimeUntilReset={checklists.getTimeUntilReset}
        />
      )}

      {currentScreen === 'detail' && selectedList && (
        <ListDetailScreen
          list={checklists.checklists.find(l => l.id === selectedList.id) || selectedList}
          onBack={handleBack}
          onToggleItem={(itemId) => checklists.toggleItem(selectedList.id, itemId)}
          onAddItem={(text) => checklists.addItem(selectedList.id, text)}
          onRemoveItem={(itemId) => checklists.removeItem(selectedList.id, itemId)}
          onResetList={() => checklists.resetList(selectedList.id)}
          onEdit={() => setCurrentScreen('add-edit')}
        />
      )}

      {currentScreen === 'add-edit' && (
        <AddEditListScreen
          list={selectedList}
          onBack={handleBack}
          onSave={handleSaveList}
        />
      )}
    </div>
  );
}
