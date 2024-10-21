
import { Image, Text, Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";

interface Picture {
    title: string;
    explanation: string;
    url: string;
}

interface PictureRenderProps {
    pictures: Picture[];
}


const PictureRender=({ pictures }: PictureRenderProps)=> {
    const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (pictures.length > 0) {
            const render = pictures.map((picture, index) => (
                <Flex display="flex" key={index} marginBottom="20px" flexWrap='wrap' justifyContent= 'center' gap='30px' >
                    <Flex display="flex" flexDirection="column" gap='15px' alignItems='center' >
                        <Heading as='h3' 
                                width='400px'
                                fontSize='30px'
                                fontWeight='400'
                                textAlign= 'center'
                                >{picture.title}</Heading>
                        <Text width='40vw' minWidth='360px'fontSize='20px' textAlign='justify'>{picture.explanation}</Text>
                    </Flex>
                    <Image src={picture.url} alt={picture.title} width='360px' objectFit="contain"  />
                </Flex>
            ));
            setPictureRender(render); 
        }
    }, [pictures]); 

    return (
        <Flex  flexWrap='wrap' alignItems='center' justifyContent= 'center'>
            {pictureRender}
        </Flex>
    );
}

export default PictureRender;
