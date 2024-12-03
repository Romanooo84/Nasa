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
import { nearObjectList, nearObjecDetails } from '../../hooks/download';
import { createDate } from '../../hooks/createDate';
import { coordinates } from '../../hooks/coordinates';

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

interface NeoDetails {
  name: string;
  isHazardous: boolean;
  diameterMeters: {
    estimated_min: number;
    estimated_max: number;
  };
  self: string;
}

type NeoList = {
  [key: string]: NeoDetails;
};

interface ObjectData {
  id: string;
  data: any;
  coordinates: {
    x: number;
    y: number;
    z: number;
  }
  earthCoordinates: {
    x: number;
    y: number;
    z: number;
  }
}

interface markup{
  id: string;
  nearDate: string;
  today: string;
}

const Home=() => {
    const [pictures, setPictures] = useState<NasaPictureData[]>([]);
    const [pictures2, setPictures2] = useState<NasaPictureData[]>([]);
    const [earthPictures, setEarthPictures] = useState<JSX.Element[]>([]);
    const {Data}=useData()
    const {pictureOfAday, marsPictures}=Data
    const [neoIdList, setNeoIDList] = useState<NeoList[]>([]);


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
        const todaydate:Date=new Date()
        const dif=new Date(todaydate.getTime() - 30 * 24 * 60 * 60 * 1000)
        const month=createDate(dif)
        const today=createDate(todaydate)
        try { 
          const data = await nearObjectList(month)
          console.log(data)
          const markup = data.data.map((item: string) => {
            const date=new Date(item[3])
            const newDate=createDate(date)
            return(
              { id:item[0],
                nearDate:newDate,
                today
              }
            )
          })     
          const fetchNearObjectDetails= async(markup: markup[])=> {
            const objectDataList:ObjectData[]=[]
            for (let i = 0; i < markup.length; i++) {
                try {
                    const neoDetails = await nearObjecDetails(`${markup[i].id}`, `${markup[i].nearDate}`, `${markup[i].today}`);
                    const objectCoordinates = coordinates(neoDetails)
                    const earthDetails = await nearObjecDetails(`399`, `${markup[i].nearDate}`, `${markup[i].today}`);
                    const earthCoordinates = coordinates(earthDetails)
                    objectDataList.push({
                      id: markup[i].id,
                      data: neoDetails,
                      coordinates: objectCoordinates,
                      earthCoordinates: earthCoordinates 
                    });
                } catch (error) {
                    console.error(`Error fetching details for ID ${markup[i]}:`, error);
                }
            }
            console.log(objectDataList)
        }

        fetchNearObjectDetails(markup)
          
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
