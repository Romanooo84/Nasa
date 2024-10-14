import { Flex, Button, Image, Spinner  } from "@chakra-ui/react"
import { useState } from "react";

interface ModalWindowProps {
    setIsModalOpen: (isOpen: boolean) => void;
    setGalleryItem: (item: string) => void;
    galleryItem: string; 
   
}

const ModalWindow=({ setIsModalOpen, galleryItem, setGalleryItem }: ModalWindowProps)=>{

    const [loading, setLoading] = useState<boolean>(true); 

    const onClick=()=>{
        setIsModalOpen(false) 
        console.log(galleryItem)
        setGalleryItem('')
    }

    return(
        <Flex 
            justifyContent='center'
            position='fixed'
            width='100vw'
            height='100%'
            zIndex='2'
            
        >
            <Button onClick={onClick}>X</Button>
            <Flex
                alignItems= 'flex-start'
                zIndex='2'
                margin='30px'
                color='orange'
            >
                {loading && <Spinner size="xl" color="blue.500" />}
                {galleryItem && galleryItem.itemType==='movie'?(<div></div>):(
                <Image
                    src={galleryItem.item} 
                    alt={'nasa pictures'}
                    width='80vw'
                    objectFit='contain'
                    onLoad={()=>setLoading(false)}
                    display={loading ? 'none' : 'block'}
                />)
            }
            </Flex> 
        </Flex>
    )
}

export default ModalWindow