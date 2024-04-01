import { useState, useEffect } from "react";

type InitialState<T> = T | (() => T);
type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorageState<T>(
  initialState: InitialState<T>,
  key: string | number // Accept string or number as key
): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(String(key)); // Ensure key is string
    return storedValue
      ? (JSON.parse(storedValue) as T)
      : initialState instanceof Function
      ? initialState()
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem(String(key), JSON.stringify(value)); // Ensure key is string
  }, [value, key]);

  return [value, setValue];
}
