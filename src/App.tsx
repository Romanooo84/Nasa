import PictureOfADay from "./components/PictureOfADay/PictureOfADay";
import Gallery from "./components/gallery/Gallery";
import { Box, Flex } from "@chakra-ui/react"
import backgroundImage from './media/GSFC_20171208_Archive_e000118~large.jpg'

function App() {

  return (
     <Box>
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
                w="80vw "
              >
                <Gallery />
                <PictureOfADay />
            </Flex>
        </Box>
  );
}

export default App;