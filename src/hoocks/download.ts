import { token } from '../data/code';
import { GalleryData } from '../components/gallery/GalleryData';

interface NasaPictureData {
    url: string;
    title: string;
    explanation: string;
    hdurl: string; // Ensure to include this property.
}

// Updated function to fetch pictures
export const fetchPicture = async (): Promise<NasaPictureData[]> => {
    const url = `https://api.nasa.gov/planetary/apod?count=4&thumbs=true&api_key=${token}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json() as NasaPictureData[]; // Use type assertion here
        return downloadedData; // Ensure it returns the correct type
    } catch (error) {
        console.error("Data error:", error);
        return []; // Return an empty array in case of error
    }
};

// Updated function to fetch gallery data
export const fetchGallery = async (text: string): Promise<GalleryData> => {
    const url = `https://images-api.nasa.gov/search?q=${text}&keywords={text}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json() as GalleryData; // Use type assertion here
        return downloadedData; // Now returns a single GalleryData object
    } catch (error) {
        console.error("Data error:", error);
        return {
            collection: { items: [] },
        };
    }
};

// Updated function to fetch gallery items
export const fetchGalleryItems = async (text: string): Promise<GalleryData> => {
    const url = `${text}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData = await response.json() as GalleryData; // Use type assertion here
        return downloadedData; // Now returns a single GalleryData object
    } catch (error) {
        console.error("Data error:", error);
        return {
            collection: { items: [] }
        };
    }
};
