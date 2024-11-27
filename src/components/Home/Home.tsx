import { useEffect, useState } from 'react';
import { fetchPolimaticImageCamera} from '../../hooks/download'
import { Heading, Flex, Image, Box } from "@chakra-ui/react"
//import Shadow from './Shadow'
import { useData } from '../../hooks/usaData';
import { Link} from "react-router-dom"
import useCarouselEffect from '../../hooks/useCarousel';
import picturesForGallery from '../../data/pic_for_gallery';
import buttonsList from "../../data/buttonList";
import PictureRender from './render';
import css from'./Home.module.css'
import EarthAnimation from '../earthAnimation/earthAnimation';
import { nearObjectList, nearObjecDetails } from '../../hooks/download';

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
      const fetchData = async () => {
        try {
          const data = await nearObjectList(); // Assume nearObjectList() is a function that returns a promise. 
          const tempData = Object.keys(data);
          let idList = [];
          for (let i = 0; i < tempData.length; i++) {
            const tempArray = data[tempData[i]];
            for (let l = 0; l < tempArray.length; l++) {
              idList.push({
                [tempArray[l].neo_reference_id]: {
                  'name': tempArray[l].name,
                  'isHazardous': tempArray[l].is_potentially_hazardous_asteroid,
                  'diameterMeters': tempArray[l].estimated_diameter.meters,
                  'self': tempArray[l].nasa_jpl_url
                }
              });
            }
          }
          
         console.log(idList);
         const noDetails= await nearObjecDetails(2415711)
         console.log(noDetails)
          
        } catch (error) {
          console.error("Error fetching data:", error);
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
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
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
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
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
          <EarthAnimation/>
      </Flex> 
    );
  }
  
  export default Home;
