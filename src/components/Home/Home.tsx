import { useEffect, useState } from 'react';
import { fetchPolimaticImageCamera} from '../../hooks/download'
import { Heading, Flex, Image, Box } from "@chakra-ui/react"
import { useData } from '../../hooks/usaData';
import { Link} from "react-router-dom"
import useCarouselEffect from '../../hooks/useCarousel';
import picturesForGallery from '../../data/pic_for_gallery';
import buttonsList from "../../data/buttonList";
import PictureRender from './render';
import css from'./Home.module.css'
import EarthAnimation from '../earthAnimation/earthAnimation';
import { asteroidCoordinates } from '../../hooks/download';
import AsteroidInfo from '../earthAnimation/asteroidInfo'

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

interface Scaled {
  x: number;
  y: number;
  z: number;
  id: string
  asteroidInfo: {
        orbital_data:{
            first_observation_date:string
            last_observation_date:string,
            orbital_period:number,
            orbit_determination_date:string
            orbit_class:{
                orbit_class_description:string
            }
        },
        estimated_diameter:{
            meters:{
                estimated_diameter_max:number
            },
            miles:{
                estimated_diameter_max:number
            },
            feet:{
                estimated_diameter_max:number
            }
        }
        close_approach_data:string,
        designation:string, 
        absolute_magnitude_h:string
        is_potentially_hazardous_asteroid:boolean,
        
    }
}

interface Data {
  x: number;
  y: number;
  z: number;
  id: string
}


const Home=() => {
    const [pictures, setPictures] = useState<NasaPictureData[]>([]);
    const [pictures2, setPictures2] = useState<NasaPictureData[]>([]);
    const [earthPictures, setEarthPictures] = useState<JSX.Element[]>([]);
    const [coordinates, setCoordinates] = useState<Data[]>([])
  
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
    const fetchData = async () => {
      const data = await asteroidCoordinates();
      if (data) {
        setCoordinates(data); // Now this is definitely a Scaled[] array
      }
    };
  fetchData();
}, []);
    

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
          alignItems='flex-start'
          color='#949aa3'
          fontFamily="Garamond"
          gap='40px'
          marginTop='10px'
          justifyContent='space-between'
          flexDirection={{ sm: 'column', md: 'column' }}
          >
          <Flex flexDirection='column'
          alignItems='center'
          width='100%'>
            <Flex gap='40px'
               flexWrap='wrap'
               justifyContent='space-between'
               width='100%'>
              <Flex
                flexDirection='column'
                alignItems='center'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)"
                }}
              >
                <Heading>{buttonsList[0]}</Heading>
                <Link to={`/${buttonsList[0]}`}>
                    <PictureRender pictures={pictures} />
                </Link>
              </Flex>
              <Flex
                flexDirection='column'
                alignItems='center'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)"
                }}
                
              >
                <Heading>{buttonsList[1]}</Heading>
                <Link to={`/${buttonsList[1]}`}>
                    <PictureRender pictures={picturesForGallery} />
                </Link>
              </Flex>
              <Flex
                flexDirection='column'
                alignItems='center'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
                }}
              >
                <Heading>{buttonsList[2]}</Heading>
                <Link to={`/${buttonsList[2]}`}>
                    <PictureRender pictures={pictures2} />
                </Link>
              </Flex>
              <Flex
                flexDirection='column'
                alignItems='center'
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
                }}
              >
                <Heading>{buttonsList[2]}</Heading>
                <Link to={`/${buttonsList[3]}`}>
                  <PictureRender pictures={picturesForGallery} />
                </Link>
              </Flex>
            </Flex>
         </Flex>
            <Box className={css.earthImageDiv}
                width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                height={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '450px' }}
                marginTop='50px'>
                {earthPictures}
            </Box>
          
            {coordinates && ( <EarthAnimation coordinates={coordinates} />)}
            {coordinates && ( <AsteroidInfo coordinates={coordinates}  />)}

      </Flex> 
    );
  }
  
  export default Home;
