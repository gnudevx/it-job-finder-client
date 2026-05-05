import { useState, useEffect } from 'react';

/**
 * Hook to debounce values
 * Delays updating the returned value until after `delay` ms of inactivity
 * @param {*} value - The value to debounce
 * @param {number} delay - Debounce delay in milliseconds (default: 500ms)
 * @returns {*} The debounced value
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
