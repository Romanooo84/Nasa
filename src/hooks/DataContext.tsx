import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';


type MarsPictureData = {
  img_src: string;
  sol: number;
  camera: { full_name: string };
  rover: { name: string };
};

type PictureOfADayData = {
 url: string;
  title: string;
  explanation: string;
  hdurl: string;
}


type DataType = {
  marsPictures: MarsPictureData[]

  pictureOfAday: PictureOfADayData[]
};

type DataContextType = {
  Data: DataType;
  updateData: (newData: Partial<DataType>) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

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
      pictureOfAday: []
      
    });
  }, []);

  return (
    <DataContext.Provider value={{ Data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
