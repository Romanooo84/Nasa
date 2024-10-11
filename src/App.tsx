
import { useEffect, useState } from 'react';
import { fetchPicture } from './hoocks/download.ts';
import { Image, Text, Flex, Heading } from "@chakra-ui/react"

interface NasaPictureData {
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
}

function App() {
  const [pictures, setPictures] = useState<NasaPictureData[]>([]);
  const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]); // Updated to store JSX elements

  useEffect(() => { 
    const fetchData = async () => {
      const downloadedPictures: NasaPictureData[]  = await fetchPicture(); // Ensure this is returning an array of NasaPictureData
      setPictures(downloadedPictures);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pictures.length > 0) {
      const render = pictures.map((picture, index) => (
        <Flex display="flex" key={index}>
          <Flex display="flex" flexDirection="column">
            <Heading  as='h3' width='400px'>{picture.title}</Heading>
            <Text width='400px'>{picture.explanation}</Text>
          </Flex>
          <Image src={picture.hdurl} alt={picture.title} width='400px'/>
        </Flex>
      ));
      setPictureRender(render); // Set the rendered JSX elements
    }
  }, [pictures]);

  return (
    <div>
      <Heading  as='h1' width='400px'>Do you know that...?</Heading>
      {pictureRender.length > 0 ? pictureRender : <p>Loading...</p>}
    </div> 
  );
}

export default App;