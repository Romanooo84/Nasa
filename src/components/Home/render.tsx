
import { Image, /*Text,*/ Flex, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useCarouselEffect from "../../hooks/useCarousel";
import cssStyle from './Home.module.css'


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
    pictures: Picture[],
    text:string
}

const PictureRender: React.FC<PictureRenderProps> = ({ pictures, text }) =>{
    const [pictureRender, setPictureRender] = useState<JSX.Element[]>([]);  
    const selectedClass = pictures && pictures.length > 0
    ? !pictures[0].camera && !pictures[0].type
      ? cssStyle.pictureOfADayDiv
      : !pictures[0].type
      ? cssStyle.pictureOfADayDivMars
      : cssStyle.GalleryDiv
    : cssStyle.defaultClass;


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
                        height='300px'
                        >
                        <Image 
                            src={!pictures[0].camera?picture.url:picture.img_src} 
                            alt={picture.camera?.full_name || picture.title || "Image"}
                            objectFit='cover'
                            //float='left' 
                            height='100%'
                            width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1400px' }}
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
            transform= 'skew(-20deg)'
            boxShadow='0px 15px 30px -5px rgb(116 124 216 / 56%)' 
            backgroundColor='#00000000'
            border='none'
            justifyContent='flex-start'
            width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1000px' }}
        >
            {pictures && pictures.length > 0 ? ( 
            <Box>
                <Flex    
                    height='300px'    
                    gap='20px'
                    alignItems='flex-start' 
                    flexWrap='wrap'
                    transform='skew(20deg)'
                    clipPath='polygon(8% 0, 100% 0, 80% 100%, 0 100%)'
                    width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1400px' }}
                    position='relative'
                    left='-10%'
                    className={
                            !pictures[0].camera && !pictures[0].type
                            ? cssStyle.pictureOfADayDiv
                            : !pictures[0].type
                            ? cssStyle.pictureOfADayDivMars
                            : cssStyle.GalleryDiv
                            }
                    justifyContent='space-evenly'
                >   
                    {pictureRender}
                    
                </Flex>
                <Box
                    position="absolute" 
                    bottom="0" >
                    <Box
                        backgroundColor="blue"
                        position="absolute" 
                        bottom="0" 
                        color="white" 
                        fontSize='25px'   
                        padding="5px"
                        width='1000px'
                        height='10px'
                        >
                        <Box
                            backgroundColor="blue"
                            position="absolute" 
                            bottom="0" 
                            color="white" 
                            fontSize='25px'   
                            padding="5px"
                            left='70%'
                            width='330px'
                            textAlign='center'
                            clipPath='polygon(5% 0, 100% 0, 95% 100%, 0 100%)'
                        >
                            {text}
                        </Box>        
                    </Box>
                </Box>
            </Box>
            ) : (
               <></>
            )}
        </Box>
    );
}

export default PictureRender;