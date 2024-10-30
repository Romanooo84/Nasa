
import { Image, /*Text,*/ Flex, Heading, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import css from './Home.module.css'


interface Picture {
    title: string;
    url: string;
    camera: {
        full_name:string
    }
    img_src: string
}

interface PictureRenderProps {
    pictures: Picture[]; // Assuming pictures is an array of objects with title and url
}


const PictureRender: React.FC<PictureRenderProps> = ({ pictures }) =>{
    const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]);



    useEffect(() => {
        if (pictures.length > 0 ) {
            const render = pictures.map((picture, index) => (
                <Box>
                {picture.title!='Caught' && <Flex key={index}
                    padding='10px'
                    flexDirection = 'column-reverse'
                    justifyContent='flex-end'
                    border='none'
                    height='500px'
                    >
                    <Image 
                        src={!pictures[0].camera?picture.url:picture.img_src} 
                        alt={!pictures[0].camera?picture.title:picture.camera.full_name}
                        objectFit='cover'
                        float='left' 
                        height='65%'
                        marginBottom='5x'
                    />
                    <Flex flexDirection='column'
                    >
                        <Heading 
                            as="h3" 
                            fontSize={{ sm: '20px', md: '30px'}} 
                            fontWeight="400" 
                            textAlign="left"
                        >
                            {!pictures[0].camera?picture.title:picture.camera.full_name}
                        </Heading>
                        {/*<Text 
                            display={{ sm: 'none', md: 'block'}}
                            className={css.pictureOfADay}
                            fontSize="20px" 
                            textAlign="justify"
                            paddingTop='5px'
                        >
                            {picture.explanation}
                        </Text>*/}
                    </Flex>
                </Flex>}
                </Box>
            ));
            setPictureRender(render);
        }
    }, [pictures]);

    useEffect(() => {
      if (pictures.length > 0) {
        const intervalId = setInterval(() => {
          const carouselContent = document.querySelector(`.${!pictures[0].camera?css.pictureOfADayDiv:css.pictureOfADayDivMars}`) as HTMLElement;
          if (carouselContent && carouselContent.children.length > 0) {
            const firstItem = carouselContent.children[0] as HTMLElement;
            carouselContent.style.transition = 'transform 0.5s ease';
            carouselContent.style.transform = `translateY(${firstItem.offsetHeight}px)`;
            setTimeout(function() {
                carouselContent.appendChild(firstItem);
                carouselContent.style.transition = 'transform 0.5s ease';;
                carouselContent.style.transform = 'translateY(0)';
            }, 1000);
          }
        }, 10000); 
  
        return () => clearInterval(intervalId);
      }
    }, [pictures]);

    return (
        <Flex 
            overflow='hidden'
            boxShadow='0px 0px 15px 5px rgba(116, 124, 216, 0.71)' 
            height='400px'
            backgroundColor='#181d5173'
        >
            {pictures && pictures.length > 0 ? ( 
                <Flex     
                    gap='20px'
                    alignItems='flex-start' 
                    width={{ sm: '320px', md: '750px', lg: '930px', xl: '1150px', '2xl': '350px' }}
                    className={!pictures[0].camera ? css.pictureOfADayDiv : css.pictureOfADayDivMars}
                    flexWrap='wrap'
                    justifyContent='space-evenly'
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

export default PictureRender;
