
import { Image, Text, Flex, Heading, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import css from './PictureOfADay.module.css'

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
                <Box key={index}
                    backgroundColor='#000000b3;'
                    borderRadius='20px'
                    padding='10px'
                    margin='10px'
                    className={css.pictureOfADay}
                    minWidth={{ sm: '290px', md: '390px', lg: '490px', xl: '590px', '2xl': '780px' }}
                    height='400px'
                    
                    >
                    <Image 
                        src={picture.url} 
                        alt={picture.title} 
                        width={{ sm: '300px', md: '260px', lg: '260px', xl: '360px', '2xl': '360px' }} 
                        objectFit="contain" 
                        float='left'
                        marginRight='20px' 
                    />
                    <Box>
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
                    </Box>
                </Box>
            ));
            setPictureRender(render);
        }
    }, [pictures]);

    useEffect(() => {
      if (pictures.length > 0) {
        const intervalId = setInterval(() => {
          const carouselContent = document.querySelector(`.${css.pictureOfADayDiv}`) as HTMLElement;
          if (carouselContent && carouselContent.children.length > 0) {
            const firstItem = carouselContent.children[0] as HTMLElement;
            carouselContent.style.transition = 'transform 0.5s ease';
            carouselContent.style.transform = `translateY(${firstItem.offsetWidth}px)`;
            setTimeout(function() {
                carouselContent.appendChild(firstItem);
                carouselContent.style.transition = 'transform 0.5s ease';;
                carouselContent.style.transform = 'translateY(0)';
            }, 500);
          }
        }, 20000); 
  
        return () => clearInterval(intervalId);
      }
    }, [pictures]);

    return (
        <Box overflow='hidden'
        boxShadow='0px 0px 15px 5px rgb(116 124 216 / 71%)'
        margin='10px'
        borderRadius='20px'
        backgroundColor='#040914cc'>
        <Flex alignItems='flex-start' width={{ sm: '300px', md: '400px', lg: '500px', xl: '600px', '2xl': '800px' }}
            className={css.pictureOfADayDiv}
            overflow='hidden'
            gap='30px'
            >   
            {pictureRender}
        </Flex>
        </Box>
    );
}

export default PictureRender;
