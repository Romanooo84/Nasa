import { fetchGallery } from "../../hoocks/download";
import { GalleryRender } from "./Render";
import { useEffect, useState } from "react";
import { Box, Flex} from "@chakra-ui/react";
import { GalleryData } from "./GalleryData";

const Gallery = () => {
    const [gallery, setGallery] = useState<GalleryData | null>(null);
    const text = 'first man on the moon';

    useEffect(() => {
        fetchGallery(text)
            .then((data: GalleryData) => { 
                setGallery(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching gallery data:", error);
            });
    }, []);

     const handleButtonClick = (href: string) => {
        console.log("Button clicked with NASA ID:", href);
        // Add any additional logic you want to perform on button click
    };


    return (
        <Box>
            <Flex display="flex" flexWrap='wrap'>
                <GalleryRender gallery={gallery} onButtonClick={handleButtonClick} />
            </Flex>
        </Box>
    );
}

export default Gallery;
