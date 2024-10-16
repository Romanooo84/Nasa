import { Button, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { SiNasa } from "react-icons/si";
import { Link} from "react-router-dom"

let textColor='rgb(81 119 227)'
let bgColor='black'

export const Header = () => {

    const [buttonsList] = useState<string[]>(['home', 'gallery']);
    const [render, setRender] = useState<JSX.Element[]>([]);
    
    
    useEffect(() => {
        const markup = buttonsList.map((button, index) => (
            <Link key={index} to={`/Nasa/${button}`}>
                <Button
                    backgroundColor={bgColor}
                    boxShadow= '0px 3px 10px 1px rgb(116 124 216 / 71%)'
                    color={textColor}
                    width='110px'
                    fontFamily="Garamond"
                    transition="transform 0.5s ease-in-out, box-shadow 0.5s ease-out"
                    _hover={{ bg: {bgColor}, transform: "scale(1.1)", boxShadow:'0px 4px 12px 2px rgb(116 124 216)'}}
                    fontWeight='700'
                    fontSize='1em'
                    
                >   
                    {button.toUpperCase()}
                </Button>
            </Link>
        ));
        setRender(markup);
    }, [buttonsList])

    return(
        <Flex
            justifyContent='space-between'
            backgroundColor='#001bd447'
            marginTop="40px"
            marginBottom='40px'
            paddingLeft='10vw'
            paddingRight='10vw'
            boxShadow= '0px 0px 50px 1px rgb(116 124 216 / 71%)'
            borderRadius='10px'
            >
            <SiNasa 
                size='80px'
                color={textColor}/>
            <Flex alignItems='center'
            gap='1vw'>
                {render}
            </Flex>
        </Flex>
    )
}

export default Header