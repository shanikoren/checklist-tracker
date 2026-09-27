export type ListType = 'instant-reset' | 'interval-reset' | 'one-time';
export type IntervalUnit = 'hours' | 'days';

export interface ListItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  type: ListType;
  items: ListItem[];
  lastResetTime: number;
  intervalHours?: number;
  createdAt: number;
  updatedAt: number;
}

export interface CategoryGroup {
  category: string;
  lists: ChecklistItem[];
}
