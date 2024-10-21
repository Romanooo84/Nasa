
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
                <div key={index} style={{ overflow: 'hidden', marginBottom: '20px' }}>
                    <Image 
                        src={picture.url} 
                        alt={picture.title} 
                        width="360px" 
                        objectFit="contain" 
                        style={{ float: 'left', marginRight: '20px' }} // Obraz po lewej z marginesem
                    />
                    <div style={{ maxWidth: '550px' }}>
                        <Heading 
                            as="h3" 
                            fontSize="30px" 
                            fontWeight="400" 
                            textAlign="left"
                        >
                            {picture.title}
                        </Heading>
                        <Text 
                            fontSize="20px" 
                            textAlign="justify"
                        >
                            {picture.explanation}
                        </Text>
                    </div>
                </div>
            ));
            setPictureRender(render);
        }
    }, [pictures]);
    return (
        <Flex  flexDirection='column' alignItems='center' justifyContent= 'center'  width='800px'>
            {pictureRender}
        </Flex>
    );
}

export default PictureRender;
