import { useEffect, useState } from "react"
//import { createDate } from "../../hoocks/createDate"
import { Box, Text, Image, Flex } from "@chakra-ui/react"
import { useData } from "../../hooks/DataContext";


const PictureOfMars=()=>{
const [pictures, setPictures]=useState<JSX.Element[]>([])
//const [date, setDate] = useState<string | undefined>();
const {Data}=useData()
const {marsPictures}=Data

/*useEffect(()=>{
    let today=new Date()
    const twoDaysAgo = new Date(today)  
    twoDaysAgo.setDate(today.getDate()-2)
    const endDate = createDate(twoDaysAgo)
    setDate(endDate)
},[])*/


useEffect(() => {
    if (Array.isArray(marsPictures)){
        console.log(marsPictures)
            const markup = marsPictures.map((item, index) => (
                <Box key={index}
                color='white'>
                    <Image src={item.img_src} alt={`Mars on sol ${item.sol}`} />
                    <Flex flexDirection='row' justifyContent='space-between'>
                        <Text>{item.camera.full_name}</Text>
                        <Text>Rover name: {item.rover.name}</Text>
                        <Text>Sol: {item.sol}</Text>
                    </Flex>
                </Box>
            ));
            setPictures(markup);
        };
    }, [marsPictures]);

    return(
        <div>{pictures}</div>
    )
}

export default PictureOfMars