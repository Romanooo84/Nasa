import { createContext } from 'react';
import { DataContextType } from './types';

// Create the context and set a default value of undefined
const DataContext = createContext<DataContextType | undefined>(undefined);

export default DataContext;