const STORAGE_KEY = "todos";

type StorageValue = unknown;

const isBrowser = typeof window !== "undefined";

export async function readFromStorage(): Promise<StorageValue | null> {
  if (!isBrowser) return null;
  return new Promise((resolve) => {
    // Simulate async access
    setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          resolve(null);
          return;
        }
        resolve(JSON.parse(raw));
      } catch {
        resolve(null);
      }
    }, 0);
  });
}

export async function writeToStorage(value: StorageValue): Promise<void> {
  if (!isBrowser) return;
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        // ignore
      }
      resolve();
    }, 0);
  });
}


