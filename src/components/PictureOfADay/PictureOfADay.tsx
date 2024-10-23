import { useEffect, useState } from 'react';
import { fetchPicture, fetchPolimaticImageCamera} from '../../hoocks/download'
import { Heading, Flex, Image, Box } from "@chakra-ui/react"
import PictureRender from './render';
import css from'./PictureOfADay.module.css'

interface NasaPictureData {
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
}


const PictureOfADay=() => {
    const [pictures, setPictures] = useState<NasaPictureData[]>([]);
    const [earthPictures, setEarthPictures] = useState<JSX.Element[]>([]);


    useEffect(()=>{
      try {
        fetchPolimaticImageCamera()
            .then(data => {
              const newData=data.map((picture, index)=>{
                const newDate=picture.date.replace(/-/g,'/').split(' ')[0]
                const imageUrl=`https://epic.gsfc.nasa.gov/archive/natural/${newDate}/png/${picture.image}.png`
                return <Flex key={index} overflow='hidden'>
                  <Image  width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                          src={imageUrl}
                        className={css.earthImage} />
                </Flex>
              })
                setEarthPictures(newData)
            })
            .catch(error => {
                console.error("Error fetching gallery data:", error);
            })
      }
      catch (error) {
          console.error("Unexpected error:", error);
      }
    },[]) 

    useEffect(() => {
        try {
            fetchPicture()
                .then(data => {
                    setPictures(data)
                })
                .catch(error => {
                    console.error("Error fetching gallery data:", error);
                })
        }
        catch (error) {
            console.error("Unexpected error:", error);
        }
    }, []);

    useEffect(() => {
      if (earthPictures.length > 0) {
        const intervalId = setInterval(() => {
          const carouselContent = document.querySelector(`.${css.earthImageDiv}`) as HTMLElement;
          if (carouselContent && carouselContent.children.length > 0) {
            const firstItem = carouselContent.children[0] as HTMLElement;
            carouselContent.appendChild(firstItem);
          }
        }, 200); 
  
        return () => clearInterval(intervalId);
      }
    }, [earthPictures]);



  
    return (
      <Flex 
          alignItems='flex-start'
          color='#949aa3'
          fontFamily="Garamond"
          gap='40px'
          marginTop='10px'
        justifyContent='space-between'
        flexDirection={{ sm: 'column', md: 'row' }}
        
          
          >
          <Flex flexDirection='column'>
            <Heading  as='h1' 
                      width= {{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                      fontWeight='600'
                      fontSize='40px'
                      >
                        Do you know that...?
            </Heading>
            <PictureRender pictures={pictures} />
         </Flex>
          <Box className={css.earthImageDiv} overflow='hidden'
            width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}>
              {earthPictures}
            </Box>
      </Flex> 
    );
  }
  
  export default PictureOfADay;
