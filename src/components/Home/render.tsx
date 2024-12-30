
import { Image, /*Text,*/ Flex, Heading, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useCarouselEffect from "../../hooks/useCarousel";
import cssStyle from './Home.module.css'
import { rotate } from "three/webgpu";


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
                //position='absolute'
                transform='rotate(45dag)'
                >
                {picture.title!='Caught' &&
                    <Flex     
                        //justifyContent='flex-end'
                         gap='0'
                        border='none'
                        height='400px'
                       
                        transition='transform 2s ease-out'
                        

                      
                        >
                        <Image 
                            src={!pictures[0].camera?picture.url:picture.img_src} 
                            alt={picture.camera?.full_name || picture.title || "Image"}
                            objectFit='cover'
                            width="300px"
                            height="100%"
                            
                     
                            //float='left' 

                            
                            
                        />
                    </Flex>}
                </Flex>
            ));
            console.log(render)
            setPictureRender(render);
        }
    }, [pictures]);

      //useCarouselEffect(pictureRender,selectedClass)

    return (
        <Box
            overflow='hidden'
            boxShadow='0px 15px 30px -5px rgb(116 124 216 / 56%)' 
            height='300px'
            backgroundColor='#00000000'
            border='none'
            transform= 'skew(-20deg)'
            >
            {pictures && pictures.length > 0 ? ( 
                <Flex     
              
                    //gap='20px'
                    alignItems='flex-start' 
                    //flexWrap='wrap'
                    width={{ sm: '320px', md: '300px', lg: '300px', xl: '300px', '2xl': '1000px' }}
                    /*</Box>className={
                            !pictures[0].camera && !pictures[0].type
                            ? cssStyle.pictureOfADayDiv
                            : !pictures[0].type
                            ? cssStyle.pictureOfADayDivMars
                            : cssStyle.GalleryDiv
                            }*/
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
