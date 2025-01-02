import { useEffect, useState } from 'react';
import { fetchPolimaticImageCamera} from '../../hooks/download'
import { Flex, Image, Box } from "@chakra-ui/react"
import { useData } from '../../hooks/usaData';
import { Link} from "react-router-dom"
import useCarouselEffect from '../../hooks/useCarousel';
import picturesForGallery from '../../data/pic_for_gallery';
import buttonsList from "../../data/buttonList";
import PictureRender from './render';
import css from'./Home.module.css'
import animGif from '../../media/Film bez tytułu (1) (1).gif'

interface NasaPictureData {
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
  pictures:string
  img_src: string;
  sol: number;
  camera: { full_name: string };
  rover: { name: string };
  pictureOfAday: []
  marsPictures: []
  picturesForGallery:[]
  type:string
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
                return <Box key={index} position='absolute'>
                  <Image  width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                          src={imageUrl}
                        />
                </Box>
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
      if(pictureOfAday.length>0){
      setPictures(pictureOfAday as NasaPictureData[])
    }
    }, [pictureOfAday]);

    useEffect(()=>{
      if(marsPictures.length>0){
        setPictures2(marsPictures as NasaPictureData[])
      }
    }, [marsPictures])

    useCarouselEffect(earthPictures, css.earthImageDiv)

    return (
      <Flex 
          alignItems='center'
          color='#949aa3'
          fontFamily="Garamond"
          gap='10px'
          marginTop='10px'
          flexDirection='column'
          width='100%'
          >
            <Flex 
               gap='50px'
               flexWrap='wrap'
               >
              <Flex
                width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1400px' }}
                flexDirection='column'
                alignItems='flex-start'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)"
                }}
              >
                <Link to={`/${buttonsList[0]}`}>
                    <PictureRender pictures={pictures} text={buttonsList[0]} />
                </Link>
              </Flex>
          <Flex
            width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1400px' }}
                flexDirection='column'
                alignItems='flex-end'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)"
                }}
                
              >
                <Link to={`/${buttonsList[1]}`}>
                    <PictureRender pictures={picturesForGallery} text={buttonsList[1]} />
                </Link>
              </Flex>
              <Flex
              width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1400px' }}
                flexDirection='column'
                alignItems='flex-start'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
                }}
              >
                <Link to={`/${buttonsList[2]}`}>
                    <PictureRender pictures={pictures2} text={buttonsList[2]} />
                </Link>
              </Flex>
              <Flex
                width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1400px' }}
                flexDirection='column'
                alignItems='flex-end'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
                }}
              >
                <Link to={`/${buttonsList[3]}`}>
                    <PictureRender pictures={animGif} text={buttonsList[3]} />
                </Link>
              </Flex>
            </Flex>
        <Box className={css.earthImageDiv}
                width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                height={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                marginTop='50px'>
                {earthPictures}
        </Box> 
      </Flex> 
    );
  }
  
  export default Home;
