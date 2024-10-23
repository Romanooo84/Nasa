import PictureOfADay from "./components/PictureOfADay/PictureOfADay";
import Gallery from "./components/gallery/Gallery";
import SharedLayout from "./components/sharedLayout/SharedLayout";
import { Route, Routes} from "react-router-dom";



function App() {

  return (
    <Routes>
      <Route path="/Nasa/" element={<SharedLayout />}>
        <Route path="/Nasa/home" element={<PictureOfADay />}/>
        <Route path="/Nasa/gallery" element={<Gallery/>}/>
      </Route>
    </Routes>
  )
}

export default App;
