
import { Box, Image, Text, Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";

interface Picture {
    title: string;
    explanation: string;
    url: string;
}

interface PictureRenderProps {
    pictures: Picture[];
}

function PictureRender({ pictures }: PictureRenderProps) {
    const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (pictures.length > 0) {
            const render = pictures.map((picture, index) => (
                <Flex display="flex" key={index} marginBottom="20px">
                    <Flex display="flex" flexDirection="column" marginRight="20px">
                        <Heading as='h3' width='400px'>{picture.title}</Heading>
                        <Text width='400px'>{picture.explanation}</Text>
                    </Flex>
                    <Image src={picture.url} alt={picture.title} width='400px' objectFit="contain"  />
                </Flex>
            ));
            setPictureRender(render); 
        }
    }, [pictures]); 

    return (
        <Box>
            {pictureRender}
        </Box>
    );
}

export default PictureRender;