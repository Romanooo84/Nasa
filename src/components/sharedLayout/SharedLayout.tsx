import Header  from "../header/Header"
import Footer from "../footer/Footer"
import { Outlet } from "react-router-dom";
import { Box, Flex,} from "@chakra-ui/react"
import backgroundImage from '../../media/PIA12835~orig.jpg'

const SharedLayout = () => {
    

    return(
        <Flex justifyContent='center'>
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
                zIndex="-100"
                minHeight='100Vh'
                minWidth='360px'
            />
            <Flex
                justifyContent='center'
                alignItems='center'
                flexDirection= 'column' 
                 m="0 auto" 
                w='100%'
                minWidth='360px'  
                paddingTop='40px'
            >
                <Header />
                     <main>
                        <Box width={{ sm: '320px', md: '740px', lg: '900px', xl: '1100px', '2xl': '1400px' }}> 
                            <Outlet />
                        </Box>
                    </main>
                <Footer />
            </Flex>
      </Flex>
    )
}

export default SharedLayout