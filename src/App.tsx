import PictureOfADay from "./components/PictureOfADay/PictureOfADay";
import Gallery from "./components/gallery/Gallery";
import PictureOfMars from "./components/pictureOfMars/PictureOfMars";
import SharedLayout from "./components/sharedLayout/SharedLayout";
import { Route, Routes} from "react-router-dom";



function App() {

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/home" element={<PictureOfADay />}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/wheather on mars" element={<PictureOfMars/>}/>
      </Route>
    </Routes>
  )
}

export default App;
