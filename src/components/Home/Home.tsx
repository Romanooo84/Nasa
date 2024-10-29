import { useEffect, useState } from 'react';
import { /*fetchPicture, */fetchPolimaticImageCamera} from '../../hooks/download'
import { Heading, Flex, Image, Box } from "@chakra-ui/react"
//import { createDate } from '../../hoocks/createDate';
import { useData } from '../../hooks/DataContext';
import PictureRender from './render';
import css from'./Home.module.css'

interface NasaPictureData {
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
  pictures:string
  pictureOfAday: []
}


const Home=() => {
    const [pictures, setPictures] = useState<NasaPictureData[]>([]);
    const [pictures2, setPictures2] = useState<NasaPictureData[]>([]);
    const [earthPictures, setEarthPictures] = useState<JSX.Element[]>([]);
    const {Data}=useData()
    const {pictureOfAday, marsPictures}=Data


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
      if(Array.isArray(pictureOfAday)){
        console.log(pictureOfAday)
      setPictures(pictureOfAday)
    }
    }, [pictureOfAday]);

    useEffect(()=>{
      
      if(Array.isArray(marsPictures)){
        console.log(marsPictures)
        setPictures2(marsPictures)
      }
    })

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
    }, [earthPictures])

    return (
      <Flex 
          alignItems='flex-start'
          color='#949aa3'
          fontFamily="Garamond"
          gap='40px'
          marginTop='10px'
          justifyContent='space-between'
          flexDirection={{ sm: 'column', md: 'column' }}
          >
          <Flex flexDirection='column'
          alignItems='center'>
            {/*<Heading  as='h1' 
                      minWidth={{ sm: '290px', md: '390px', lg: '490px', xl: '590px', '2xl': '350px' }}
                      fontWeight='600'
                      fontSize='40px'
                      >
                        Do you know that...?
            </Heading>*/}
            <Flex gap='40px'>
              <Box>
                <Heading>Pictures of a day</Heading>
              <PictureRender pictures={pictures} />,
              </Box>
              <Box>
              <Heading>Mars Pictures</Heading>
              <PictureRender pictures={pictures2} />
              </Box>
            </Flex>
         </Flex>
            <Box className={css.earthImageDiv} overflow='hidden'
                width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                marginTop='50px'>
                {earthPictures}
            </Box>
      </Flex> 
    );
  }
  
  export default Home;
