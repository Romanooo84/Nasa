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

interface Scaled {
  x: number;
  y: number;
  z: number;
  id: string
}



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

    export const nearObjectList =async (Date: string) =>{
      const url = `https://romanpisarski.pl/nasa/neolist?date=${Date}`
      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json();
        return downloadedData
        ; 
      } catch (error) {
          console.error("Data error:", error);
          return []
      }
    }

    export const nearObjecDetails =async (objectId:string, startDate:string, endDate:string) =>{
      const url =`https://romanpisarski.pl/nasa/neodetails?id=${objectId}&startDate=${startDate}&endDate=${endDate}`
      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json();
        return downloadedData
        ; 
      } catch (error) {
          console.error("Data error:", error);
          return []
      }
    }

    export const asteroidCoordinates =async () =>{
      const url =`https://romanpisarski.pl/nasa/test`
      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData : Scaled[] = await response.json();
        return downloadedData
        ; 
      } catch (error) {
          console.error("Data error:", error);
          return []
      }
    }