import { useEffect, useState } from "react"
import { pictureOfMars } from "../../hoocks/download"
import { createDate } from "../../hoocks/createDate"
import { Box, Text, Image, Flex } from "@chakra-ui/react"


const PictureOfMars=()=>{
const [marsPictures, setMarsPictures]=useState<JSX.Element[]>([])
const [date, setDate] = useState<string | undefined>();

useEffect(()=>{
    const today=new Date()
    const twoDaysAgo = new Date(today)  
    twoDaysAgo.setDate(today.getDate()-2)
    const endDate = createDate(twoDaysAgo)
    setDate(endDate)
},[])


useEffect(() => {
    if (date){
    pictureOfMars(date) 
        .then(data => {
            const markup = data.map((item, index) => (
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
            setMarsPictures(markup);
        });
    }
}, [date]);

    return(
        <div>{marsPictures}</div>
    )
}

export default PictureOfMars
