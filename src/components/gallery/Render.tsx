import { useEffect, useState } from "react";
import { Image, Button, Text, Flex } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa"
import { FaVideo } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";
import { GalleryData } from "./GalleryData";

interface GalleryRenderProps {
    gallery: GalleryData | null; 
    onButtonClick: (href: string) => void; 
}

const mainColor = 'rgb(81 119 227)'
const ColorBackground = "black"

export const GalleryRender = ({ gallery, onButtonClick }: GalleryRenderProps) => {
    const [render, setRender] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (gallery?.collection) {
            const galleryMarkup = gallery.collection.items.map((item) => {
                if (item.links && item.links.length > 0 && item.data && item.data.length > 0) {
                    return (
                        <Button
                            onClick={() => onButtonClick(item.href)} 
                            key={item.href} 
                            name={item.data[0].media_type}
                            height='450px'
                            width='300px'
                            flexWrap='wrap'
                            backgroundColor= {ColorBackground}
                            padding='0px'
                            flexDirection="column"
                            justifyContent="space-around"
                            gap='10px'
                            transition="transform 0.75s ease-in-out, box-shadow 1s ease-out"
                            boxShadow= '0px 5px 15px 3px rgb(116 124 216 / 71%)'
                            _hover={{ bg: {ColorBackground}, transform: "scale(1.1)", boxShadow:'0px 10px 20px 5px rgb(116 124 216)'}}
                            
                           >
                            <Image 
                                alt={item.data[0].title} 
                                src={item.links[0].href} 
                                width='300px' 
                                height='300px'
                                objectFit='contain'  
                                background={ColorBackground}
                                border="none"
                            />
                            <Text 
                                overflow='hidden'
                                whiteSpace= 'wrap'
                                color={mainColor}
                                fontSize='25px'
                                width='300px' 
                            >
                                {item.data[0].title}
                            </Text>
                            {item.data[0].media_type === 'video' ? (
                                <FaVideo 
                                    color= {mainColor}
                                    size='30px'
                                />
                            ) : item.data[0].media_type === 'image' ? (
                                 <FaImage 
                                    color={mainColor}
                                    size='30px'
                                />
                            ) : (
                                 <MdAudiotrack 
                                    color={mainColor}
                                    size='30px'
                                 />
                            )}
                        </Button>
                    );
                }
                return null; 
            });
            setRender(galleryMarkup.filter((item): item is JSX.Element => item !== null));
        }
    }, [gallery, onButtonClick]);

    return (
        <Flex 
            flexWrap='wrap'
            justifyContent="center"
            gap='50px'
            >
                {render}
        </Flex> 
    );
};
