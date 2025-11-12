/**
 * LocalStorage Utility
 * For storing settings, preferences, and small metadata
 */

import { AppSettings } from '@/types/settings.types';

class LocalStorageManager {
  private readonly PREFIX = 'ai-studio:';

  // Generic storage methods
  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.PREFIX + key, serialized);
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.PREFIX + key);
  }

  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Settings-specific methods
  saveSettings(settings: AppSettings): void {
    this.setItem('settings', settings);
  }

  getSettings(): AppSettings | null {
    return this.getItem<AppSettings>('settings');
  }

  // Recent projects
  saveRecentProjects(projectIds: string[]): void {
    this.setItem('recent-projects', projectIds);
  }

  getRecentProjects(): string[] {
    return this.getItem<string[]>('recent-projects') || [];
  }

  addRecentProject(projectId: string): void {
    const recent = this.getRecentProjects();
    const filtered = recent.filter((id) => id !== projectId);
    const updated = [projectId, ...filtered].slice(0, 10); // Keep last 10
    this.saveRecentProjects(updated);
  }

  // Active state
  saveActiveProject(projectId: string): void {
    this.setItem('active-project', projectId);
  }

  getActiveProject(): string | null {
    return this.getItem<string>('active-project');
  }

  // UI state
  saveUIState(state: Record<string, any>): void {
    this.setItem('ui-state', state);
  }

  getUIState(): Record<string, any> | null {
    return this.getItem<Record<string, any>>('ui-state');
  }

  // API Keys (Note: For production, use more secure storage)
  saveAPIKey(provider: string, key: string): void {
    const keys = this.getItem<Record<string, string>>('api-keys') || {};
    keys[provider] = key;
    this.setItem('api-keys', keys);
  }

  getAPIKey(provider: string): string | null {
    const keys = this.getItem<Record<string, string>>('api-keys');
    return keys?.[provider] || null;
  }

  deleteAPIKey(provider: string): void {
    const keys = this.getItem<Record<string, string>>('api-keys');
    if (keys) {
      delete keys[provider];
      this.setItem('api-keys', keys);
    }
  }

  // Storage info
  getStorageInfo(): {
    used: number;
    available: number;
    percentage: number;
  } {
    let used = 0;
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        used += (localStorage.getItem(key)?.length || 0) * 2; // UTF-16 = 2 bytes per char
      }
    });

    const available = 5 * 1024 * 1024; // 5MB typical limit
    const percentage = (used / available) * 100;

    return { used, available, percentage };
  }

  // Export all data
  exportAll(): Record<string, any> {
    const data: Record<string, any> = {};
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(this.PREFIX)) {
        const cleanKey = key.replace(this.PREFIX, '');
        const value = localStorage.getItem(key);
        if (value) {
          try {
            data[cleanKey] = JSON.parse(value);
          } catch {
            data[cleanKey] = value;
          }
        }
      }
    });

    return data;
  }

  // Import data
  importAll(data: Record<string, any>): void {
    Object.entries(data).forEach(([key, value]) => {
      this.setItem(key, value);
    });
  }
}

// Export singleton instance
export const localStorageManager = new LocalStorageManager();
