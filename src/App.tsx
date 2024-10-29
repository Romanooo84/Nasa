//import PictureOfADay from "./components/Home/Home";
import Gallery from "./components/gallery/Gallery";
import PictureOfMars from "./components/pictureOfMars/PictureOfMars";
import SharedLayout from "./components/sharedLayout/SharedLayout";
import { Route, Routes} from "react-router-dom";
import { useData } from "./hooks/DataContext";
import {pictureOfMars, fetchPicture} from './hooks/download'
import { useState, useEffect } from "react";
import { createDate } from "./hooks/createDate";



function App() {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate]  = useState<string>()
  const {updateData } = useData();

  useEffect(()=>{
    const today = new Date()
    const twoDaysAgo = new Date(today)  
    twoDaysAgo.setDate(today.getDate()-2)
    const endDate = createDate(twoDaysAgo)
    setEndDate(endDate)
    const sevenDayAgo = new Date(today)  
    sevenDayAgo.setDate(today.getDate()-7)
    const date=createDate(sevenDayAgo)
    console.log(date)
    setStartDate(date)
  },[])

  useEffect(() => {
    if (endDate){
    pictureOfMars(endDate) 
        .then(data => {
          console.log(data)
            updateData(
              {marsPictures:data}
            );
        });
    }
  }, [endDate]);

  useEffect(() => {
    if  (startDate && endDate){
      fetchPicture (startDate, endDate) 
        .then(data => {
          console.log(data)
            updateData(
              {pictureOfAday:data}
            );
        });
    }
  }, [startDate,endDate])



  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/*<Route path="/picture of a day" element={<PictureOfADay />}/>*/}
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/Mars Pictures" element={<PictureOfMars/>}/>
      </Route>
    </Routes>
  )
}

export default App;
