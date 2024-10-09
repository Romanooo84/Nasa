
import { useEffect, useState } from 'react';
import { token } from './data/code.ts'

interface NasaPictureData {
  url: string;
}

function App() {

  const [picture, setPicture]=useState<string | null>(null)

   useEffect(() => { 
    const fetchPicture = async () => { 
      const url = `https://api.nasa.gov/planetary/apod?api_key=${token}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const downloadedData: NasaPictureData = await response.json();
        setPicture(downloadedData.url); 
      } catch (error) {
        console.error("Data error:", error);
      }
    };

    fetchPicture(); 
  }, [])
  

  

  return (
  <div>
      <p>Nasa Project try to start and delete gh-pages</p>
      <img src={picture}></img>
    </div> 
  )
}

export default App
