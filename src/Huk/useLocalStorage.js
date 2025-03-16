// useLocalStorage.js
import { useState, useEffect, useRef } from "react";

function useLocalStorage(key, initialValue) {
  const isMountedRef = useRef(false);
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [storedValue, key]);

  const setValue = (value) => {
    try {
      setStoredValue((prev) => {
        const newVal = typeof value === "function" ? value(prev) : value;
        localStorage.setItem(key, JSON.stringify(newVal));
        return newVal;
      });
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
