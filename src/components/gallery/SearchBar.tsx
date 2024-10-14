
import { GalleryData } from "./GalleryData";
import { fetchGallery } from "../../hoocks/download";
import { useState} from "react";
import { Flex, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { IoSearch, } from "react-icons/io5";

interface SearchBarProps {
    setGallery: (data: GalleryData | null) => void;
}

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
        <Flex>
            <InputGroup>
            <InputRightElement>
                <Button 
                    padding='0' 
                    width='40px'
                    onClick={onClick}>
                        <IoSearch size='20px' pointerEvents='none'/>
                </Button>
            </InputRightElement>
                <Input 
                placeholder='Find NASA media'
                onChange={event=>setInputValue(event.target.value)}></Input>
            </InputGroup>
        </Flex>
    )
}

export default SearchBar