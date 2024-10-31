import { Button, Flex, Text} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { SiNasa } from "react-icons/si";
import { Link} from "react-router-dom"
import buttonsList from "../../data/buttonList";
import logo from '../../media/pngegg.png'

const textColor='rgb(112 127 150)'
const bgColor='#3e6ebb70'

export const Header = () => {

   
    const [render, setRender] = useState<JSX.Element[]>([]);
    
    
    useEffect(() => {
        const markup = buttonsList.map((button, index) => (
            <Link key={index} to={`/${button}`}>
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
                    <Text whiteSpace='normal'>{button.toUpperCase()}</Text>
                </Button>
            </Link>
        ));
        setRender(markup);
    }, [buttonsList])

    return(
        <Flex
            
            backgroundColor='#090f3d00'
            backgroundImage={logo}
            backgroundSize='400px'
            backgroundPosition="center" // Center the image
            backgroundRepeat="no-repeat"
            marginTop="20px"
            marginBottom='40px'
            boxShadow= '0px 0px 50px 1px rgb(116 124 216 / 71%)'
            borderRadius='10px'
            width='100%'
            justifyContent='center'
            height='200px'

        >
            <Flex width={{ sm: '320px', md: '740px', lg: '900px', xl: '1100px', '2xl': '1400px' }}
                justifyContent='space-between'
                alignContent='center'
                alignItems='center'>
                <Flex
                alignItems='center'
                 //flexDirection='column'
                > 
                <Flex
                    width='128px'
                    height='65px'
                    overflow='hidden'
                    alignItems='center'
                    marginRight='10px'>  
                    <SiNasa 
                        size='150px'
                        color={textColor}/>
                </Flex>  
                <Text fontSize='50px'
                    color='#707f96'
                    fontWeight='700'
                    paddingBottom='5px'
                    >Astro Explorer</Text>
                </Flex>
                <Flex alignItems='center'
                    gap='1vw'>
                    {render}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header
