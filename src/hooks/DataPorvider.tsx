import React, { useState, useEffect, ReactNode } from 'react';
import DataContext from './DataContext';
import { DataType} from './types';

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [Data, setData] = useState<DataType>({
    marsPictures: [],
    pictureOfAday: [],
  });

  const updateData = (newData: Partial<DataType>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    updateData({
      marsPictures: [],
      pictureOfAday: [],
    });
  }, []);

  return (
    <DataContext.Provider value={{ Data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
