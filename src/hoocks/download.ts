import { token } from '../data/code'
import { GalleryData} from '../components/gallery/GalleryData';

interface NasaPictureData {
    url: string;
    title: string;
    explanation: string;
    hdurl: string; 
}

interface PolimaticImageCamera{
  image: string
  date: string
}

  export const fetchPicture = async (): Promise<NasaPictureData[]> => {
    const url = `https://api.nasa.gov/planetary/apod?count=4&thumbs=true&api_key=${token}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData: NasaPictureData[] = await response.json();
      return downloadedData; 
    } catch (error) {
      console.error("Data error:", error);
      return []; 
    }
};

export const fetchGallery = async (text: string) : Promise<GalleryData> => {
    const url = `https://images-api.nasa.gov/search?q=${text}&keywords={text}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData: GalleryData = await response.json(); 
        return downloadedData; 
    } catch (error) {
        console.error("Data error:", error);
        return {
          collection: { items: [] },
      };
    }
};

export const fetchGalleryItems = async(text: string) : Promise<GalleryData> =>{
      const url = `${text}`;
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const downloadedData: GalleryData = await response.json(); 
          return downloadedData; 
        } catch (error) {
            console.error("Data error:", error);
            return {
              collection: { items: [] }
           };
        }
};

export const fetchPolimaticImageCamera = async():Promise<PolimaticImageCamera[]> =>{
  const url = `https://epic.gsfc.nasa.gov/api/natural`; - //link from https://epic.gsfc.nasa.gov/about/api
  console.log(url)
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData: PolimaticImageCamera[] = await response.json();
      return downloadedData; 
    } catch (error) {
        console.error("Data error:", error);
        return []
    }
  }

  export const fetchPICDate = async():Promise<PolimaticImageCamera[]> =>{
    const url = `https://api.nasa.gov/EPIC/api/natural/all?api_key=${token}`;
    console.log(url)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData: PolimaticImageCamera[] = await response.json();
        return downloadedData; 
      } catch (error) {
          console.error("Data error:", error);
          return []
      }
    }
