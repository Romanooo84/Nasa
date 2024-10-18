import { useEffect, useState } from 'react';
import { fetchPicture, fetchPolimaticImageCamera, fetchPICDate } from '../../hoocks/download'
import { Heading, Flex, Image } from "@chakra-ui/react"
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
    const [earthImage, setEarthImage]=useState<string>()
    //const [actualDate, setActualDate] = useState<string>('')

    /*useEffect(()=>{
      try {
        fetchPICDate()
            .then(data => {
              setActualDate(data[0].date)
            })
            .catch(error => {
                console.error("Error fetching gallery data:", error);
            })
      }
      catch (error) {
          console.error("Unexpected error:", error);
      }
    },[])*/

    useEffect(()=>{
      try {
        fetchPolimaticImageCamera()
            .then(data => {
              const newData=data.map((picture, index)=>{
                const newDate=picture.date.replace(/-/g,'/').split(' ')[0]
                const imageUrl=`https://epic.gsfc.nasa.gov/archive/natural/${newDate}/png/${picture.image}.png`
                return <Flex>
                  <Image src={imageUrl} className={`image${index}`}/>
                </Flex>
              })
                setEarthPictures(newData)
                console.log(newData[0].props.children.props.className)
                console.log(newData)
            })
            .catch(error => {
                console.error("Error fetching gallery data:", error);
            })
      }
      catch (error) {
          console.error("Unexpected error:", error);
      }
    },[]) 

    useEffect(()=>{
      let slide=1
      const intervalId = setInterval(() => {
        const totalSlides=earthPictures.length
        if (slide===totalSlides-1){
            slide=1
        }else{
            slide++
        }
        setEarthImage(earthPictures[slide])
    }, 250);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    },[earthPictures])

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
        <Flex>
          <Image width='300px' src= {earthImage}></Image>
        </Flex>
      </Flex> 
    );
  }
  
  export default PictureOfADay;
