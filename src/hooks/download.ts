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

    export const nearObjectList =async (/*StartDate: string, endDate: string*/) =>{
      const url =`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-11-20&end_date=2024-11-27&&api_key=${token}`
      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json();
        return downloadedData.near_earth_objects
        ; 
      } catch (error) {
          console.error("Data error:", error);
          return []
      }
    }

    export const nearObjecDetails =async (objectId:number) =>{
      const url =`https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND=${objectId}&EPHEM_TYPE=VECTORS&CENTER=500@0&START_TIME=2024-11-26&STOP_TIME=2024-11-27&STEP_SIZE=1d&OUT_UNITS=KM-S&VEC_TABLE=2&REF_PLANE=ECLIPTIC`
      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json();
        return downloadedData.n
        ; 
      } catch (error) {
          console.error("Data error:", error);
          return []
      }
    }