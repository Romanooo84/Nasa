
import { Image, /*Text,*/ Flex, Heading, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useCarouselEffect from "../../hooks/useCarousel";
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
    
    const selectedClass = pictures && pictures.length > 0
    ? !pictures[0].camera && !pictures[0].type
      ? css.pictureOfADayDiv
      : !pictures[0].type
      ? css.pictureOfADayDivMars
      : css.GalleryDiv
    : css.defaultClass;


    useEffect(() => {
        if (pictures.length > 0 ) {
            const render = pictures
            .filter((_, index) => index <= 5)
            .map((picture, index) => (
                <Flex key={index}
                position='absolute'
                >
                {picture.title!='Caught' &&
                    <Flex     
                        flexDirection = 'column-reverse'
                        justifyContent='flex-end'

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

      useCarouselEffect(pictureRender,selectedClass)

    return (
        <Box
            overflow='hidden'
            boxShadow='0px 15px 30px -5px rgb(116 124 216 / 56%)' 
            height='400px'
            backgroundColor='#00000000'
            border='none'
        >
            {pictures && pictures.length > 0 ? ( 
                <Flex     
                transition='transform 2s ease-out'
                _hover={{
                  transform: "scale(1.1)", // Optional: adds a slight scaling effect
                }}
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
