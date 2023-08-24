import { useState } from 'react';
import { UseLocalStorageType } from '../types/types';

function useLocalStorage(key: string, initialValue: string): UseLocalStorageType {
  const storedValue = localStorage.getItem(key) || initialValue;
  const [value, setValue] = useState<string>(storedValue);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };
  return {
    value,
    updateValue,
  };
}

export default useLocalStorage;
