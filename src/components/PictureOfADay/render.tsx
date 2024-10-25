
import { Image, Text, Flex, Heading} from "@chakra-ui/react"
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
                <>
                {picture.title!='Caught' && <Flex key={index}
                    backgroundColor='#181d5173'
                    //borderRadius='20px'
                    padding='10px'
                    marginTop='20px'
                    flexDirection = {{ sm: 'column-reverse', md: 'row'}}
                    justifyContent='center'
                    
                    boxShadow='0px 0px 10px 5px rgb(116 124 216 / 71%)'
                    //width={{ sm: '290px', md: '700px', lg: '920px', xl: '1100px', '2xl': '100%' }}
                    height={{ sm: '500px', md: '400px', lg: '400px', xl: '400px', '2xl': '450px' }}
                    
                    >
                    <Image 
                        src={picture.url} 
                        alt={picture.title} 
                        maxWidth={{ sm: '100%', md: '350px', lg: '400px', xl: '500px', '2xl': '600px' }} 
                        objectFit='cover'
                        float='left' 
                        height={{ sm: '400px', md: '100%' }}
                    />
                    <Flex flexDirection='column'
                    marginLeft={{ sm: '0', md: '20px'}}>
                        <Heading 
                            as="h3" 
                            fontSize={{ sm: '20px', md: '30px'}} 
                            fontWeight="400" 
                            textAlign="left"
                        >
                            {picture.title}
                        </Heading>
                        <Text 
                            
                            display={{ sm: 'none', md: 'block'}}
                            className={css.pictureOfADay}
                            fontSize="20px" 
                            textAlign="justify"
                            paddingTop='5px'
                            
                        >
                            {picture.explanation}
                        </Text>
                    </Flex>
                </Flex>}
                </>
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
            carouselContent.style.transform = `translateY(${firstItem.offsetHeight}px)`;
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
        <Flex        
            //overflow='hidden'
            //boxShadow='0px 0px 15px 5px rgb(116 124 216 / 71%)'
            gap='20px'
            //borderRadius='20px'
            //backgroundColor='#040914cc'
            alignItems='flex-start' 
            width={{ sm: '320px', md: '750px', lg: '930px', xl: '1150px', '2xl': '1430px' }}
            //className={css.pictureOfADayDiv}
            //overflow='hidden'
            flexWrap='wrap'
            justifyContent='space-evenly'
                >   
                {pictureRender}
  
        </Flex>
    );
}

export default PictureRender;
