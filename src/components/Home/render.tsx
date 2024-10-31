
import { Image, /*Text,*/ Flex, Heading, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import css from './Home.module.css'


interface Picture {
    title: string;
    url: string;
    type:string;
    camera?: {
        full_name:string
    }
    img_src?: string
    
}

interface PictureRenderProps {
    pictures: Picture[]; 
}


const PictureRender: React.FC<PictureRenderProps> = ({ pictures }) =>{
    const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]);



    useEffect(() => {
        if (pictures.length > 0 ) {
            const render = pictures
            .filter((_, index) => index <= 5)
            .map((picture, index) => (
                <Flex key={index}
                position='absolute'
                //top= '-15px'
                >
                {picture.title!='Caught' &&
                    <Flex
                        //padding='10px'
                        flexDirection = 'column-reverse'
                        justifyContent='flex-end'
                        //alignItems='stretch'
                        border='none'
                        height='400px'
                        
                        >
                        <Image 
                            src={!pictures[0].camera?picture.url:picture.img_src} 
                            alt={picture.camera?.full_name || picture.title || "Image"}
                            objectFit='cover'
                            float='left' 
                            height='100%'
                            width='330px' 
                        />
                    </Flex>}
                </Flex>
            ));
            setPictureRender(render);
        }
    }, [pictures]);

    useEffect(() => {
        let i = 0; 
        if (pictures.length > 0) {
          const intervalId = setInterval(() => {
            const carouselContent = document.querySelector(
              `.${!pictures[0].camera && !pictures[0].type
                ? css.pictureOfADayDiv
                : !pictures[0].type
                ? css.pictureOfADayDivMars
                : css.GalleryDiv}`
            ) as HTMLElement;
      
            if (carouselContent && carouselContent.children.length > 0) {
              Array.from(carouselContent.children).forEach((child, index) => {
                (child as HTMLElement).style.opacity = index === i ? '1' : '0';
                (child as HTMLElement).style.transition = 'opacity 5s ease';
              });
              i = (i + 1) % carouselContent.children.length;
            }
          }, 10000);
      
          // Clear the interval on component unmount to avoid memory leaks
          return () => clearInterval(intervalId);
        }
      }, [pictures]);

    return (
        <Box
            overflow='hidden'
            boxShadow='0px 0px 15px 5px rgba(116, 124, 216, 0.71)' 
            height='400px'
            backgroundColor='#00000000'
        >
            {pictures && pictures.length > 0 ? ( 
                <Flex     
                    gap='20px'
                    alignItems='flex-start' 
                    flexWrap='wrap'
                    width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '300px' }}
                    className={
                            !pictures[0].camera && !pictures[0].type
                            ? css.pictureOfADayDiv
                            : !pictures[0].type
                            ? css.pictureOfADayDivMars
                            : css.GalleryDiv
                            }
                    justifyContent='space-evenly'
                >   
                    {pictureRender}
                </Flex>
            ) : (
                <Flex justifyContent="center" alignItems="center" height="100%">
                    <Heading as="h3" color="white">No pictures available</Heading>
                </Flex>
            )}
        </Box>
    );
}

export default PictureRender;
