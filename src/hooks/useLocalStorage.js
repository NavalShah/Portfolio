import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // The server and the first client render must use the same value.
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch {
      // Storage can be blocked or contain an invalid value. Keep the default.
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);

    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // Keep the in-memory preference when persistent storage is unavailable.
    }
  };

  return [storedValue, setValue];
}
