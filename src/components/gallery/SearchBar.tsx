
import { GalleryData } from "./GalleryData";
import { fetchGallery } from "../../hoocks/download";
import { useState} from "react";
import { Flex, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { IoSearch, } from "react-icons/io5";

interface SearchBarProps {
    setGallery: (data: GalleryData | null) => void;
}

const mainColor = 'rgb(139 213 222)'

const SearchBar =({ setGallery }: SearchBarProps)=>{
    const [inputValue, setInputValue]=useState<string>("")

    const onClick=()=>{
        fetchGallery(inputValue)
        .then((data: GalleryData) => { 
            setGallery(data);
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching gallery data:", error);
        });
    }

    return(
        <Flex 
            boxShadow= '0px 5px 15px 3px rgb(116 124 216 / 71%)'
            transition="transform 0.5s ease-in-out" 
            _hover={{ transform: "scale(1.05)" }}  
        >
            <InputGroup>
            <InputRightElement>
                <Button 
                    padding='0' 
                    width='40px'
                    background='transparent'
                    onClick={onClick}
                    transition="transform 0.5s ease-in-out" 
                    _hover={{ transform: "scale(1.2)" }}  >
                        <IoSearch 
                            size='20px'
                            pointerEvents='none'
                            color={mainColor}
                            />
                </Button>
            </InputRightElement>
                <Input 
                color={mainColor}
                fontSize='20px'
                backgroundColor='#3e6ebb70'
                placeholder='Find NASA media'
                onChange={event=>setInputValue(event.target.value)}></Input>
            </InputGroup>
        </Flex>
    )
}

export default SearchBar