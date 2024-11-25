import { token } from '../data/code'
import { GalleryData } from '../components/gallery/GalleryData';

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

interface MarsPicture {
  img_src: string;
  sol: number;
  camera: {
      full_name: string;
  };
  rover: {
      name: string;
  };
}

interface MarsPicturesResponse {
  photos: MarsPicture[];
}

interface HorizonsRequest {
  format: string;
  COMMAND: string;
  CENTER: string;
  MAKE_EPHEM: string;
  TABLE_TYPE: string;
  START_TIME: string;
  STOP_TIME: string;
  STEP_SIZE: string;
}

interface HorizonsResponse {
  rawData: string; // Surowa odpowiedź z API
}

const horizonsApiUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';

export const fetchPicture = async (StartDate: string, endDate: string): Promise<NasaPictureData[]> => {
   
    const url = `https://api.nasa.gov/planetary/apod?start_date=${StartDate}&end_date=${endDate}&thumbs=true&api_key=${token}`;
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
    const url = `https://images-api.nasa.gov/search?q=${text}&keywords=${text}&description=${text}&description_508=${text}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData: GalleryData = await response.json(); 
        console.log(downloadedData)
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
  const url = `https://epic.gsfc.nasa.gov/api/natural`;  //link from https://epic.gsfc.nasa.gov/about/api
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

    export const pictureOfMars = async(date:string):Promise<MarsPicture[]> =>{
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=${date}&api_key=${token}`;
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const downloadedData: MarsPicturesResponse = await response.json();
          return downloadedData.photos; 
        } catch (error) {
            console.error("Data error:", error);
            return []
        }
      }

    export const fetchHorizonsData = async (requestBody: HorizonsRequest): Promise<HorizonsResponse> => {
      try {
        const response = await fetch(horizonsApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          mode: 'no-cors'
        });
    
        if (!response.ok) {
          throw new Error(`API returned status code ${response.status}`);
        }
    
        const rawData = await response.text(); // Pobierz odpowiedź jako tekst
        return { rawData };
      } catch (error) {
        throw new Error(`Error fetching Horizons data: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
