import { Button, Flex} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { SiNasa } from "react-icons/si";
import { Link} from "react-router-dom"

const textColor='rgb(112 127 150)'
const bgColor='#3e6ebb70'

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
                    border='1px solid #a6b2c2'
                    
                >   
                    {button.toUpperCase()}
                </Button>
            </Link>
        ));
        setRender(markup);
    }, [buttonsList])

    return(
        <Flex
            
            backgroundColor='#090f3d00'
            marginTop="20px"
            marginBottom='40px'
            boxShadow= '0px 0px 50px 1px rgb(116 124 216 / 71%)'
            borderRadius='10px'
            width='100%'
            justifyContent='center'

        >
            <Flex width={{ sm: '320px', md: '740px', lg: '900px', xl: '1100px', '2xl': '1400px' }}
                justifyContent='space-between'>
                <SiNasa 
                    size='80px'
                    color={textColor}/>
                <Flex alignItems='center'
                    gap='1vw'>
                    {render}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header
