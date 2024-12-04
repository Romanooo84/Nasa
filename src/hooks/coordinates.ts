import { nearObjecDetails, nearObjectList } from "./download";
import { createDate } from "./createDate";

interface ObjectData {
    id: string;
    data: any;
    coordinates: {
      x: number;
      y: number;
      z: number;
    }
    earthCoordinates: {
      x: number;
      y: number;
      z: number;
    },
    dist_min:number
  }

  interface markup{
    id: string;
    nearDate: string;
    today: string;
    dist_min: number
  }

  

export const coordinates=(objectData:string)=>{
                    const startIndex = objectData.indexOf('$$SOE')
                    const endIndex = objectData.indexOf("$$EOE");
                    const extracted = objectData.substring(startIndex, endIndex).trim()
                    const data=extracted.split('TDB')

                    const XdirectionStartIndex = data[2].indexOf('X =')
                    const XdirectionEndIndex = data[2].indexOf('Y')
                    const Xdirection= Number(data[2].substring(XdirectionStartIndex+4 , XdirectionEndIndex).trim())
                   
                    const YdirectionStartIndex = data[2].indexOf('Y =')
                    const YdirectionEndIndex = data[2].indexOf('Z')
                    const Ydirection = Number(data[2].substring(YdirectionStartIndex+4 , YdirectionEndIndex).trim())
                
                    const ZdirectionStartIndex = data[2].indexOf(' Z =')
                    const ZdirectionEndIndex = data[2].indexOf('VX')
                    const Zdirection = Number(data[2].substring(ZdirectionStartIndex+4 , ZdirectionEndIndex).trim())

                    const coordinatesXYZ={
                        x:Xdirection,
                        y:Ydirection,
                        z:Zdirection
                    }

                    return (coordinatesXYZ)
}

export const  fetchNearObjectDetails= async(markup: markup[])=> {
  const objectDataList:ObjectData[]=[]
  for (let i = 0; i < markup.length; i++) {
      try {
          const neoDetails = await nearObjecDetails(`${markup[i].id}`, `${markup[i].nearDate}`, `${markup[i].today}`);
          if (markup[i].id!='399'){
          console.log(neoDetails)}
          const objectCoordinates = coordinates(neoDetails)
          const earthDetails = await nearObjecDetails(`399`, `${markup[i].nearDate}`, `${markup[i].today}`);
          const earthCoordinates = coordinates(earthDetails)
          objectDataList.push({
            id: markup[i].id,
            data: neoDetails,
            coordinates: objectCoordinates,
            earthCoordinates: earthCoordinates,
            dist_min:markup[i].dist_min
          });
      } catch (error) {
          console.error(`Error fetching details for ID ${markup[i]}:`, error);
      }
  }
  return objectDataList
}


export const findCoordinates = async () => {
  const todaydate:Date=new Date()
  const dif=new Date(todaydate.getTime() - 30 * 24 * 60 * 60 * 1000)
  const month=createDate(dif)
  const today=createDate(todaydate)
  try { 
    const data = await nearObjectList(month)
    const markup = data.data.map((item: string) => {
      const date=new Date(item[3])
      const newDate=createDate(date)
      return(
        { id:item[0],
          nearDate:newDate,
          today,
          dist_min:item[5]
        }
      )
    })        
  const coordinates = await fetchNearObjectDetails(markup)
  return coordinates
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const countCoorodinates = async () =>{
  interface Scaled{
    x: number;
    y: number;
    z: number;
    id:string;
  }
  try {
    const data = await findCoordinates();
    console.log(data)
    const lunarDayKM = 384399
    const astronomicalUnitKM = 149597870.7
    const objectCorodinatesKM = data?.map(item=>{
      const distanceKM = lunarDayKM*item.dist_min

      const newXObjectCoordinate = (item.coordinates.x-item.earthCoordinates.x)
      const newYObjectCoordinate = (item.coordinates.y-item.earthCoordinates.y)
      const newZObjectCoordinate = (item.coordinates.z-item.earthCoordinates.z)

      const obectDistanceByCoordinatesKM = astronomicalUnitKM *Math.sqrt(newXObjectCoordinate*2+newYObjectCoordinate*2+newZObjectCoordinate*2)
      const proportion = distanceKM/obectDistanceByCoordinatesKM

      const scaledXObject =  newXObjectCoordinate*proportion*astronomicalUnitKM
      const scaledYObject =  newYObjectCoordinate*proportion*astronomicalUnitKM
      const scaledZObject =  newZObjectCoordinate*proportion*astronomicalUnitKM

      const scaledCoordinates:Scaled={x:scaledXObject, y:scaledYObject, z:scaledZObject, id:item.id}
      
      return (scaledCoordinates)
    })
    return objectCorodinatesKM
    
  } catch (error) {
    console.error("Failed to fetch coordinates:", error);
  }
}


