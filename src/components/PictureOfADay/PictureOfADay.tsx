import { useEffect, useState } from 'react';
import { fetchPicture } from '../../hoocks/download';
import { Heading } from "@chakra-ui/react"
import PictureRender from './render';

interface NasaPictureData {
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
}

function PictureOfADay() {
    const [pictures, setPictures] = useState<NasaPictureData[]>([]);
    
    useEffect(() => { 
      const fetchData = async () => {
        const downloadedPictures: NasaPictureData[]  = await fetchPicture();
        setPictures(downloadedPictures);
        console.log(downloadedPictures)
      };
     
      fetchData();
    }, []);
  
    return (
      <div>
        <Heading  as='h1' width='400px'>Do you know that...?</Heading>
        <PictureRender pictures={pictures} />
      </div> 
    );
  }
  
  export default PictureOfADay;
