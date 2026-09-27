import { useState, useEffect, useCallback } from 'react';
import { ChecklistItem, ListItem, ListType, IntervalUnit } from '../types';

const STORAGE_KEY = 'checklists';

export function useChecklists() {
  const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setChecklists(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load checklists:', e);
      }
    }
    setLoaded(true);
  }, []);

  const save = useCallback((items: ChecklistItem[]) => {
    setChecklists(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const addChecklist = useCallback((name: string, category: string, type: ListType, intervalValue?: number, intervalUnit?: IntervalUnit) => {
    const intervalHours = intervalValue && intervalUnit === 'days' ? intervalValue * 24 : intervalValue;

    const newChecklist: ChecklistItem = {
      id: Date.now().toString(),
      name,
      category,
      type,
      items: [],
      lastResetTime: Date.now(),
      intervalHours: type === 'interval-reset' ? intervalHours : undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    save([...checklists, newChecklist]);
    return newChecklist;
  }, [checklists, save]);

  const updateChecklist = useCallback((id: string, updates: Partial<ChecklistItem>) => {
    const updated = checklists.map(list =>
      list.id === id ? { ...list, ...updates, updatedAt: Date.now() } : list
    );
    save(updated);
  }, [checklists, save]);

  const deleteChecklist = useCallback((id: string) => {
    save(checklists.filter(list => list.id !== id));
  }, [checklists, save]);

  const toggleItem = useCallback((listId: string, itemId: string) => {
    const updated = checklists.map(list => {
      if (list.id !== listId) return list;

      const newItems = list.items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );

      const allCompleted = newItems.every(item => item.completed) && newItems.length > 0;

      if (allCompleted && list.type === 'instant-reset') {
        return {
          ...list,
          items: newItems.map(item => ({ ...item, completed: false })),
          lastResetTime: Date.now(),
          updatedAt: Date.now(),
        };
      }

      return { ...list, items: newItems, updatedAt: Date.now() };
    });

    save(updated);
  }, [checklists, save]);

  const addItem = useCallback((listId: string, text: string) => {
    const updated = checklists.map(list => {
      if (list.id !== listId) return list;
      return {
        ...list,
        items: [...list.items, { id: Date.now().toString(), text, completed: false }],
        updatedAt: Date.now(),
      };
    });
    save(updated);
  }, [checklists, save]);

  const removeItem = useCallback((listId: string, itemId: string) => {
    const updated = checklists.map(list => {
      if (list.id !== listId) return list;
      return {
        ...list,
        items: list.items.filter(item => item.id !== itemId),
        updatedAt: Date.now(),
      };
    });
    save(updated);
  }, [checklists, save]);

  const resetList = useCallback((listId: string) => {
    const updated = checklists.map(list => {
      if (list.id !== listId) return list;
      return {
        ...list,
        items: list.items.map(item => ({ ...item, completed: false })),
        lastResetTime: Date.now(),
        updatedAt: Date.now(),
      };
    });
    save(updated);
  }, [checklists, save]);

  const checkIntervalReset = useCallback((list: ChecklistItem): boolean => {
    if (list.type !== 'interval-reset' || !list.intervalHours) return false;

    const hoursSinceReset = (Date.now() - list.lastResetTime) / (1000 * 60 * 60);
    return hoursSinceReset >= list.intervalHours;
  }, []);

  const autoResetIntervalLists = useCallback(() => {
    const updated = checklists.map(list => {
      if (checkIntervalReset(list)) {
        return {
          ...list,
          items: list.items.map(item => ({ ...item, completed: false })),
          lastResetTime: Date.now(),
          updatedAt: Date.now(),
        };
      }
      return list;
    });

    if (updated.some((list, i) => list.lastResetTime !== checklists[i].lastResetTime)) {
      save(updated);
    }
  }, [checklists, save, checkIntervalReset]);

  useEffect(() => {
    autoResetIntervalLists();
  }, [autoResetIntervalLists]);

  const getTimeUntilReset = useCallback((list: ChecklistItem): string | null => {
    if (list.type !== 'interval-reset' || !list.intervalHours) return null;

    const hoursSinceReset = (Date.now() - list.lastResetTime) / (1000 * 60 * 60);
    const hoursRemaining = list.intervalHours - hoursSinceReset;

    if (hoursRemaining <= 0) return 'Ready';

    if (hoursRemaining >= 24) {
      const days = Math.ceil(hoursRemaining / 24);
      return `${days}d`;
    }

    return `${Math.ceil(hoursRemaining)}h`;
  }, []);

  return {
    checklists,
    loaded,
    addChecklist,
    updateChecklist,
    deleteChecklist,
    toggleItem,
    addItem,
    removeItem,
    resetList,
    getTimeUntilReset,
    checkIntervalReset,
    autoResetIntervalLists,
  };
}
