import { nearObjecDetails, nearObjectList } from "./download";
import { createDate } from "./createDate";

interface ObjectData {
    id: string;
    data: string;
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

  interface Scaled{
    x: number;
    y: number;
    z: number;
    id:string;
  }  

export const coordinates=(objectData:string, id:string)=>{
                    const startIndex = objectData.indexOf('$$SOE')
                    const endIndex = objectData.indexOf("$$EOE");
                    const extracted = objectData.substring(startIndex, endIndex).trim()
                    const data=extracted.split('TDB')
  
                    const XdirectionStartIndex = data[1].indexOf('X =')
                    const XdirectionEndIndex = data[1].indexOf('Y')
                    const Xdirection= Number(data[1].substring(XdirectionStartIndex+4 , XdirectionEndIndex).trim())
                   
                    const YdirectionStartIndex = data[1].indexOf('Y =')
                    const YdirectionEndIndex = data[1].indexOf('Z')
                    const Ydirection = Number(data[1].substring(YdirectionStartIndex+4 , YdirectionEndIndex).trim())
                
                    const ZdirectionStartIndex = data[1].indexOf(' Z =')
                    const ZdirectionEndIndex = data[1].indexOf('VX')
                    const Zdirection = Number(data[1].substring(ZdirectionStartIndex+4 , ZdirectionEndIndex).trim())

                    const coordinatesXYZ={
                        x:Xdirection,
                        y:Ydirection,
                        z:Zdirection,
                        id
                    }
                    return (coordinatesXYZ)
}

export const  fetchNearObjectDetails= async(markup: markup[])=> {
  const objectDataList:ObjectData[]=[]
  for (let i = 0; i < markup.length; i++) {
      try {
          const neoDetails = await nearObjecDetails(`${markup[i].id}`, `${markup[i].nearDate}`, `${markup[i].today}`);
          const objectCoordinates = coordinates(neoDetails, markup[i].id)
          const earthDetails = await nearObjecDetails(`399`, `${markup[i].nearDate}`, `${markup[i].today}`);
          const earthCoordinates = coordinates(earthDetails,'399')
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

export const planetDetails = async (planetID: string, distance: number) => {
  interface PlanetData {
    id: string;
    data: string;
    coordinates: {
      x: number;
      y: number;
      z: number;
    };
    earthCoordinates: {
      x: number;
      y: number;
      z: number;
    };
    distance: number;
  }

  const todayDate: Date = new Date();
  const diff = new Date(todayDate.getTime() - 1 * 24 * 60 * 60 * 1000); // Yesterday's date
  const oneDay = createDate(diff);
  const today = createDate(todayDate);

  try {
    // Fetch details for the object
    const neoDetails = await nearObjecDetails(planetID, `${oneDay}`, `${today}`);
    const objectCoordinates = coordinates(neoDetails, planetID);

    // Fetch details for Earth (if different)
    const earthDetails = await nearObjecDetails('399', `${oneDay}`, `${today}`);
    const earthCoordinates = coordinates(earthDetails, '399');

    // Construct and return the result
    const planetData: PlanetData = {
      id: planetID,
      data: neoDetails,
      coordinates: objectCoordinates,
      earthCoordinates: earthCoordinates,
      distance,
    };
    return planetData;
  } catch (error) {
    console.error(`Error fetching details for ID ${planetID}:`, error);
    throw error; // Re-throw error to handle it in the caller function
  }
};



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

export const countCoorodinates = async (planetID:string='no planet', distance:number=0) : Promise<Scaled[] | undefined> =>{

  try {
    if(planetID==='no planet')
    {
    const data = await findCoordinates()
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
  } else {
    const data = await planetDetails(planetID, distance);
    const astronomicalUnitKM = 149597870.7
    
      const distanceKM = distance

      const newXObjectCoordinate = (data.coordinates.x-data.earthCoordinates.x)
      const newYObjectCoordinate = (data.coordinates.y-data.earthCoordinates.y)
      const newZObjectCoordinate = (data.coordinates.z-data.earthCoordinates.z)

      const obectDistanceByCoordinatesKM = astronomicalUnitKM *Math.sqrt(newXObjectCoordinate*2+newYObjectCoordinate*2+newZObjectCoordinate*2)
      const proportion = distanceKM/obectDistanceByCoordinatesKM

      const scaledXObject =  newXObjectCoordinate*proportion*astronomicalUnitKM
      const scaledYObject =  newYObjectCoordinate*proportion*astronomicalUnitKM
      const scaledZObject =  newZObjectCoordinate*proportion*astronomicalUnitKM

      const scaledCoordinates:Scaled={x:scaledXObject, y:scaledYObject, z:scaledZObject, id:data.id}

      return [scaledCoordinates]
  }
  } catch (error) {
    console.error("Failed to fetch coordinates:", error);
  }
}


