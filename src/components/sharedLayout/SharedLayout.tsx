import Header  from "../header/HEADER"
import Footer from "../footer/Footer"
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react"
import backgroundImage from '../../media/PIA12835~orig.jpg'

const SharedLayout=()=>{
    return(
        <Flex>
             <Box 
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage={`url(${backgroundImage})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundAttachment="fixed"
                zIndex="-1"
            />
            <Flex
             justifyContent="space-evenly" 
             wrap="wrap" 
             m="0 auto" 
             w="80vw ">
                <Header />
                    <main>
                        <Outlet />
                    </main>
                <Footer />
            </Flex>
      </Flex>
    )
}

export default SharedLayout