import { useEffect, useState } from 'react';
import { fetchPicture } from '../../../download';
import { Heading, Flex } from "@chakra-ui/react"
import PictureRender from './render';

interface NasaPictureData {
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
}

const PictureOfADay=() => {
    const [pictures, setPictures] = useState<NasaPictureData[]>([]);
  
    useEffect(() => {
        try {
            fetchPicture()
                .then(data => {
                    setPictures(data)
                    console.log(data)
                })
                .catch(error => {
                    console.error("Error fetching gallery data:", error);
                })
        }
        catch (error) {
            console.error("Unexpected error:", error);
        }
    }, []);
  
    return (
      <Flex flexDirection= 'column'
          alignItems= 'center'
          color='#949aa3'
          fontFamily="Garamond"
          gap='20px'
          marginTop='10px'
          >
        <Heading  as='h1' 
                  width='400px'
                  fontWeight='600'
                  fontSize='40px'
                  >
                    Do you know that...?
        </Heading>
        <PictureRender pictures={pictures} />
      </Flex> 
    );
  }
  
  export default PictureOfADay;
