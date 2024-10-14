import PictureOfADay from "./components/PictureOfADay/PictureOfADay";
import Gallery from "./components/gallery/Gallery";
import { Box} from "@chakra-ui/react"

function App() {

  return (
    <Box>
      <Gallery/>
      <PictureOfADay/>
    </Box> 
  );
}

export default App;