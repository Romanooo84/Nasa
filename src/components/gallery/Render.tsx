import { useEffect, useState } from "react";
import { Image, Button, Text } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa"
import { FaVideo } from "react-icons/fa6";
import { MdAudiotrack } from "react-icons/md";
import { GalleryData } from "./GalleryData";

interface GalleryRenderProps {
    gallery: GalleryData | null; 
    onButtonClick: (href: string) => void; 
}

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
                            height='400px'
                            width='400px'
                            flexWrap='wrap'
                            backgroundColor='transparent'
                           >
                            <Image 
                                alt={item.data[0].title} 
                                src={item.links[0].href} 
                                width='300px' 
                                height='300px'
                                objectFit='contain'  
                                background='black'
                            />
                            <Text 
                            overflow='hidden'
                            whiteSpace= 'wrap'
                            >
                                {item.data[0].title}
                            </Text>
                            {item.data[0].media_type === 'video' ? (
                                <Text><FaVideo /></Text>
                            ) : item.data[0].media_type === 'image' ? (
                                 <Text><FaImage /></Text>
                            ) : (
                                 <Text><MdAudiotrack /></Text>
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
        <>{render}</> 
    );
};
