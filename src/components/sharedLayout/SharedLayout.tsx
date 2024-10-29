import Header  from "../header/Header"
import Footer from "../footer/Footer"
import Home from '../Home/Home'
import { Outlet, useLocation  } from "react-router-dom";
import { Box, Flex,} from "@chakra-ui/react"
import backgroundImage from '../../media/PIA12835~orig.jpg'
import { useEffect } from "react";

const SharedLayout = () => {
    const location = useLocation();
    const { hash, pathname, search } = location;

    useEffect(()=>{
        console.log(pathname)
        console.log(hash)
        console.log(search)
    },[])

    return(

        <Flex >
            <Box justifyContent='center'
                backgroundColor='black'
                position="absolute"
                minHeight='120vh'
                minWidth='320px'
                zIndex="-101"
                top="0"
                left="0"
                right="0"
                bottom="0"/>
                
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
                minHeight='120vh'
                minWidth='320px'
                opacity='0.15'
                backgroundBlendMode= 'overlay'
            />
            <Flex
                justifyContent='center'
                alignItems='center'
                flexDirection= 'column' 
                 m="0 auto" 
                w='100%'
                minWidth='320px'  
                paddingTop='40px'
            >
                <Header />
                     <main>
                        <Box width={{ sm: '320px', md: '740px', lg: '900px', xl: '1100px', '2xl': '1400px' }}> 
                            {pathname==='/'?<Home/>:<Outlet />}
                        </Box>
                    </main>
                <Footer />
            </Flex>
      </Flex>
    )
}

export default SharedLayout