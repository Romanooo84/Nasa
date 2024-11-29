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
    X:number
    Y:number
    Z:number
  }
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
        try {
          const data = await nearObjectList('2024-11-22', '2024-11-28')
          const tempData = Object.keys(data);
          const idList:NeoList[] = [];
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
          setNeoIDList(idList)
          const allKeys = Object.values(idList).map(item => Object.keys(item)[0]);
          const objectDataList: ObjectData[] = []
          
          const fetchNearObjectDetails= async(allKeys:string[])=> {
            for (let i = 0; i < allKeys.length; i++) {
                try {
                    const neoDetails = await nearObjecDetails(`DES=${allKeys[i]}`, '2024-11-27', '2024-11-28');
                    const startIndex = neoDetails.indexOf('$$SOE')
                    const endIndex = neoDetails.indexOf("$$EOE");
                    const extracted = neoDetails.substring(startIndex, endIndex).trim()
                    const data=extracted.split('TDB')

                    const XdirectionStartIndex = data[2].indexOf('X =')
                    const XdirectionEndIndex = data[2].indexOf('Y')
                    const Xdirection= Number(data[2].substring(XdirectionStartIndex+4 , XdirectionEndIndex).trim())
                   
                    const YdirectionStartIndex = data[2].indexOf('Y =')
                    const YdirectionEndIndex = data[2].indexOf('Z')
                    const Ydirection = Number(data[2].substring(YdirectionStartIndex+4 , YdirectionEndIndex).trim())
                
                    const ZdirectionStartIndex = data[2].indexOf(' Z =')
                    const ZdirectionEndIndex = data[2].indexOf('VX')
                    const Zdirection = Number(data[2].substring(ZdirectionStartIndex+4 , ZdirectionEndIndex).trim())
           

                    objectDataList.push({
                      id: allKeys[i],
                      data: neoDetails,
                      coordinates: {
                        X:Xdirection,
                        Y:Ydirection,
                        Z:Zdirection}
                    });
                } catch (error) {
                    console.error(`Error fetching details for ID ${allKeys[i]}:`, error);
                }
            }
            console.log(objectDataList)
        }

        fetchNearObjectDetails(allKeys)
          
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
