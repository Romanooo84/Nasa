
import { Image, Text, Flex, Heading, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import {fetchPicture} from '../../hooks/download'
import { createDate } from "../../hooks/createDate";
import css from '../Home/Home.module.css'
import { useData } from "../../hooks/DataContext";





const PictureOfADay= () =>{
    const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]);
    const [startDate, setStartDate] = useState<string>()
    const [endDate, setEndDate]  = useState<string>()
    const [start, setStart]=useState<boolean>(true)
    const {Data, updateData } = useData();
    const {pictureOfAday}=Data

    useEffect(()=>{
        const today = new Date()
        const twoDaysAgo = new Date(today)  
        twoDaysAgo.setDate(today.getDate()-2)
        const endDate = createDate(twoDaysAgo)
        setEndDate(endDate)
        const sevenDayAgo = new Date(today)  
        sevenDayAgo.setDate(today.getDate()-30)
        const date=createDate(sevenDayAgo)
        setStartDate(date)
      },[])

      useEffect(() => {
        if  (startDate && endDate && start){
          fetchPicture (startDate, endDate) 
            .then(data => {
                updateData(
                  {pictureOfAday:data}
                );
                setStart(false)
            });
        }
      }, [startDate,endDate, updateData, start])


    useEffect(() => {
        if (pictureOfAday) {
            const render = pictureOfAday
            .map((picture, index) => (
                <Box  key={index}>
                {picture.title!='Caught' &&
                    <Flex
                        padding='10px'
                        justifyContent='flex-end'
                        alignItems='stretch'
                        border='none'
                        height='400px'
                        boxShadow='0px 0px 15px 5px rgba(116, 124, 216, 0.71)' 
                        backgroundColor='#00000000'
                        >
                        <Image 
                            src={picture.url} 
                            alt={picture.title}
                            objectFit='cover'
                            float='left' 
                            height='100%'
                            width='330px' 
                        />
                        <Flex flexDirection='column'
                        marginLeft='20px'
                         color='white'
                        >
                           <Heading 
                                as="h3" 
                                fontSize={{ sm: '20px', md: '30px'}} 
                                fontWeight="400" 
                                textAlign="left"
                                height='75px'
                               
                            >
                                {picture.title}
                            </Heading>
                            <Text 
                                display={{ sm: 'none', md: 'block'}}
                                className={css.pictureOfADay}
                                fontSize="20px" 
                                textAlign="justify"
                                paddingTop='5px'
                            >
                                {picture.explanation}
                            </Text>
                        </Flex>
                    </Flex>}
                </Box>
            ));
            setPictureRender(render);
        }
    }, [pictureOfAday]);

    


    return (
        <Flex 
      
        >
            {pictureOfAday && pictureOfAday.length > 0 ? ( 
                <Flex     
                    gap='50px'
                    alignItems='flex-start' 
                    flexWrap='wrap'
                    width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1440px' }}
                    justifyContent='space-evenly'
                    flexDirection= 'column-reverse'
                >   
                    {pictureRender}
                </Flex>
            ) : (
                <Flex justifyContent="center" alignItems="center" height="100%">
                    <Heading as="h3" color="white">No pictures available</Heading>
                </Flex>
            )}
        </Flex>
    );
}

export default PictureOfADay;
