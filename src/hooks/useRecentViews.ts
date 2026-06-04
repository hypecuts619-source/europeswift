import { useState, useEffect } from 'react';

export interface RecentItem {
  id: string; // unique identifier, e.g., 'DE-Deutsche-Bank'
  title: string;
  type: 'swift' | 'iban' | 'sortcode' | 'blz' | 'country';
  url: string;
  timestamp: number;
}

const STORAGE_KEY = 'swiftcodedir_recent_views';
const MAX_ITEMS = 6;

export function useRecentViews() {
  const [recentViews, setRecentViews] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentViews(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading recent views', e);
    }
  }, []);

  const trackView = (item: Omit<RecentItem, 'timestamp'>) => {
    setRecentViews(prev => {
      // Remove if it already exists to put it at the top
      const filtered = prev.filter(pItem => pItem.id !== item.id);
      
      const newViews = [
        { ...item, timestamp: Date.now() },
        ...filtered
      ].slice(0, MAX_ITEMS);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newViews));
      } catch (e) {
        console.error('Error saving recent views', e);
      }
      
      return newViews;
    });
  };

  const clearViews = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentViews([]);
  };

  return { recentViews, trackView, clearViews };
}
