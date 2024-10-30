
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
                <Box  key={index}>
                {picture.title!='Caught' &&
                    <Flex
                        padding='10px'
                        flexDirection = 'column-reverse'
                        justifyContent='flex-end'
                        alignItems='stretch'
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
                        <Flex flexDirection='column'
                        >
                           {/* <Heading 
                                as="h3" 
                                fontSize={{ sm: '20px', md: '30px'}} 
                                fontWeight="400" 
                                textAlign="left"
                                height='75px'
                            >
                                {!pictures[0].camera?picture.title:picture.camera.full_name}
                            </Heading>
                            <Text 
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
          const carouselContent = document.querySelector(`.${!pictures[0].camera && !pictures[0].type
            ? css.pictureOfADayDiv
            : !pictures[0].type
            ? css.pictureOfADayDivMars
            : css.GalleryDiv}`) as HTMLElement;
          if (carouselContent && carouselContent.children.length > 0) {
            const firstItem = carouselContent.children[0] as HTMLElement;
            carouselContent.style.transition = 'opacity 1.5s ease, transform 1s ease-in';
            carouselContent.style.transform = `translateY(${firstItem.offsetHeight}px)`;
            carouselContent.style.opacity= '0'
            setTimeout(function() {
                carouselContent.appendChild(firstItem);
                carouselContent.style.transition = 'opacity 1.5s ease, transform 1s ease-out';;
                carouselContent.style.transform = 'translateY(0)';
                carouselContent.style.opacity= '1'
            }, 2000);
          }
        }, 5000); 
  
        return () => clearInterval(intervalId);
      }
    }, [pictures]);

    return (
        <Flex 
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
        </Flex>
    );
}

export default PictureRender;
