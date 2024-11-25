import { useContext } from 'react';
import DataContext from './DataContext';
import { DataContextType } from './types';

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
