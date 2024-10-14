import { fetchGallery, fetchGalleryItems  } from "../../hoocks/download";
import { GalleryRender } from "./Render";
import { useEffect, useState } from "react";
import { Box, Flex} from "@chakra-ui/react";
import { GalleryData } from "./GalleryData";
import SearchBar from "./SearchBar";
import ModalWindow from "../modal/modal";

const Gallery = () => {
    const [gallery, setGallery] = useState<GalleryData | null>(null);
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false);
    const [galleryItem, setGalleryItem]= useState<any>(null);
    const text = 'moon';

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
        fetchGalleryItems(href)
            .then((data: GalleryData | string[]) => { 
                if (Array.isArray(data)) {
                    console.log(data)
                    let type = data.filter((filtered) => {
                        if (filtered.endsWith('large.mp4') || filtered.endsWith('orig.mp4')) {
                              setGalleryItem({
                                    item: filtered,
                                    itemType: 'movie'
                                })
                         }
                     return(filtered)
                    });
                    console.log(type)
                    if (type&&type.length === 0) {
                        for (let i = 0; i < data.length; i++) {
                            const type = data[i].split('~')[1];
                            
                             if (type === 'large.jpg') {
                                setGalleryItem({
                                    item: data[i],
                                    itemType: 'jpg'
                                }
                                );
                                return;
                            } else if (type === 'medium.jpg') {
                                setGalleryItem({
                                    item: data[i],
                                    itemType: 'jpg'
                                }
                                );
                                return;
                            }
                            else if (type === 'orig.jpg') {
                                setGalleryItem({
                                    item: data[i],
                                    itemType: 'jpg'
                                }
                                );
                                return;
                            }
                        }
                    }
                } else {
                    console.error("Data is not an array:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching gallery data:", error);
            });
        setIsModalOpen(true)
    };


    return (
        <Box>
            {isModalOpen && <ModalWindow setIsModalOpen={setIsModalOpen} galleryItem={galleryItem} setGalleryItem={setGalleryItem}/>}
            <Flex display="flex" flexWrap='wrap'>
                <SearchBar setGallery={setGallery}></SearchBar>
                <GalleryRender gallery={gallery} onButtonClick={handleButtonClick} />
            </Flex>
            
        </Box>
    );
}

export default Gallery;
