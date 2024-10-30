
export type MarsPictureData = {
    img_src: string;
    sol: number;
    camera: { full_name: string };
    rover: { name: string };
  };
  
  export type PictureOfADayData = {
    url: string;
    title: string;
    explanation: string;
    hdurl: string;
  };
  
  export type DataType = {
    marsPictures: MarsPictureData[];
    pictureOfAday: PictureOfADayData[];
  };
  
  export type DataContextType = {
    Data: DataType;
    updateData: (newData: Partial<DataType>) => void;
  };
  