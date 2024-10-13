import { token } from '../data/code'

interface NasaPictureData {
    url: string;
    title: string;
    explanation: string;
    hdurl: string; // Make sure to include this property.
}

interface GalleryData {
    collection: {
        items: {
            links: { href: string }[];
            data: { title: string; nasa_id: string }[];
        }[];
    };
}

  export const fetchPicture = async (): Promise<NasaPictureData[]> => {
    const url = `https://api.nasa.gov/planetary/apod?count=4&thumbs=true&api_key=${token}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const downloadedData: NasaPictureData[] = await response.json();
      return downloadedData; // Upewnij się, że zwraca poprawny typ
    } catch (error) {
      console.error("Data error:", error);
      return []; // Zwróć pustą tablicę w przypadku błędu
    }
};

export const fetchGallery = async (text: string): Promise<GalleryData> => {
    const url = `https://images-api.nasa.gov/search?q=${text}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData: GalleryData = await response.json(); // Zmieniono na GalleryData
        return downloadedData; // Teraz zwraca pojedynczy obiekt GalleryData
    } catch (error) {
        console.error("Data error:", error);
        return { collection: { items: [] } }; // Zwróć pusty obiekt zgodny z GalleryData
    }
};
  
