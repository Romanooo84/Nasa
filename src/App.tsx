import PictureOfADay from "./components//pictureOfADay/pictureOfADay";
import Gallery from "./components/gallery/Gallery";
import PictureOfMars from "./components/pictureOfMars/PictureOfMars";
import SharedLayout from "./components/sharedLayout/SharedLayout";
import { Route, Routes} from "react-router-dom";
import { useData } from "./hooks/usaData";
import {pictureOfMars, fetchPicture} from './hooks/download'
import { useState, useEffect } from "react";
import { createDate } from "./hooks/createDate";
import NearObjectDetails from "./components/earthAnimation/nearObjectDetails";



function App() {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate]  = useState<string>()
  const {updateData } = useData();
  const [start, setStart]=useState<boolean>(true)

  useEffect(()=>{
    const today = new Date()
    const twoDaysAgo = new Date(today)  
    twoDaysAgo.setDate(today.getDate()-2)
    const endDate = createDate(twoDaysAgo)
    setEndDate(endDate)
    const sevenDayAgo = new Date(today)  
    sevenDayAgo.setDate(today.getDate()-7)
    const date=createDate(sevenDayAgo)
    setStartDate(date)
  },[])

  useEffect(() => {
    if (endDate && start){
    pictureOfMars(endDate) 
        .then(data => {
            updateData(
              {marsPictures:data}
            );
            setStart(false)
        });
    }
  }, [endDate, updateData, start]);

  useEffect(() => {
    if  (startDate && endDate && start){
      fetchPicture (startDate, endDate) 
        .then(data => {
            updateData(
              {pictureOfAday:data}
            );
            setStart(false)
        });
    }
  }, [startDate,endDate, updateData, start])



  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/picture of a day" element={<PictureOfADay/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/Mars Pictures" element={<PictureOfMars/>}/>
        <Route path="/Near Earth Object" element={<NearObjectDetails/>}/>
      </Route>
    </Routes>
  )
}

export default App;
