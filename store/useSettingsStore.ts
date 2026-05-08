import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SettingsState = {
  bulkImportDelimiter: '|';
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    () => ({
      bulkImportDelimiter: '|' as const,
    }),
    { name: 'ydsmind-settings' }
  )
);
