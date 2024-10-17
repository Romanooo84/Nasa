import { Flex, Button, Image, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GalleryItems } from "../gallery/GalleryData";
import ReactPlayer from 'react-player'

interface ModalWindowProps {
    setIsModalOpen: (isOpen: boolean) => void;
    setGalleryItem: (item: GalleryItems) => void;  
    galleryItem: GalleryItems | null;  
}

const ModalWindow = ({ setIsModalOpen, galleryItem, setGalleryItem }: ModalWindowProps) => {
    const [loading, setLoading] = useState<boolean>(true);

    const onClick = () => {
        setIsModalOpen(false);
        setGalleryItem({ item: '', itemType: null });
    };

    useEffect(() => {
        if (galleryItem) {
            setLoading(false)
        } 
    }, [galleryItem]);

    return (
        <Flex
            justifyContent="center"
            alignItems='center'
            position="fixed"
            width="100vw"
            height="100vh"
            zIndex="2"
            background="rgba(0,0,0,0.97)" 
            top="0"
            left="0"
        >
            <Button
                position="absolute"
                top="20px"
                right="20px"
                onClick={onClick}
                colorScheme="red"
                zIndex="3"
            >
                X
            </Button>

            <Flex
                alignItems="center"
                justifyContent="center"
                zIndex="2"
                margin="30px"
                color="orange"
                position="relative"
            >
                {loading && <Spinner size="xl" color="blue.500" position="absolute" />}
                
                {galleryItem && galleryItem.itemType === 'jpg' && (
                    <Image
                        src={galleryItem.item}
                        alt={'nasa pictures'}
                        height='90vh'
                        objectFit="contain"
                        onLoad={() => setLoading(false)}
                        display={loading ? 'none' : 'block'}
                    />
                )}
                
                {galleryItem && galleryItem.itemType === 'movie' && (
                    <ReactPlayer 
                        url={galleryItem.item}
                        playing={true}
                        controls={true}
                        loop={true}
                        volume={0.8}
                        width="80%"
                        height="80%"
                        objectFit="contain"/>
                )}
            </Flex>
        </Flex>
    );
};

export default ModalWindow;
