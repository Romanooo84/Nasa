import { fetchGallery, fetchGalleryItems  } from "../../hoocks/download";
import { GalleryRender } from "./Render";
import { useEffect, useState } from "react";
import { Flex} from "@chakra-ui/react";
import { GalleryData, GalleryItems } from "./GalleryData";
import SearchBar from "./SearchBar";
import ModalWindow from "../modal/modal";



const Gallery = () => {
    const [gallery, setGallery] = useState<GalleryData | null>(null);
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false);
    const [galleryItem, setGalleryItem] = useState<GalleryItems>({
            item: '',
            itemType: null,
        });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newSearch, setNewSearch] = useState<boolean>(false);
    
    const text="moon"
    
    useEffect(() => {
        setIsLoading(true)
        setNewSearch(true)
        fetchGallery(text)
            .then((data: GalleryData) => { 
                setGallery(data)
            })
            .catch(error => {
                console.error("Error fetching gallery data:", error);
            });  
    }, [text]);

     const handleButtonClick = (href: string) => {
        
        fetchGalleryItems(href)
            .then((data: GalleryData | string[]) => { 
                if (Array.isArray(data)) {
                    const type = data.filter((filtered) => {
                        if (filtered.endsWith('large.mp4') || filtered.endsWith('orig.mp4')) {
                              setGalleryItem({
                                    item: filtered,
                                    itemType: 'movie'
                              })
                            return(filtered)
                         }
                    });
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
        <Flex 
            justifyContent="center"
            >
            {isModalOpen && <ModalWindow setIsModalOpen={setIsModalOpen} galleryItem={galleryItem} setGalleryItem={setGalleryItem}/>}
                <Flex 
                    display="flex" 
                    flexDirection="column"
                    justifyContent="center"
                    alignItems='center'
                    gap='50px'
                >
                <SearchBar setGallery={setGallery} setIsLoading={setIsLoading} setNewSearch={setNewSearch} />
                    <GalleryRender gallery={gallery} onButtonClick={handleButtonClick} isLoading={isLoading} setIsLoading={setIsLoading} setNewSearch={setNewSearch} newSearch={newSearch} />
                </Flex>
        </Flex>
    );
}

export default Gallery;
