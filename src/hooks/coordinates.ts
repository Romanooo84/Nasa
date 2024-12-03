import { nearObjecDetails } from "./download";

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
    }
  }

  interface markup{
    id: string;
    nearDate: string;
    today: string;
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
            const objectCoordinates = coordinates(neoDetails)
            const earthDetails = await nearObjecDetails(`399`, `${markup[i].nearDate}`, `${markup[i].today}`);
            const earthCoordinates = coordinates(earthDetails)
            objectDataList.push({
              id: markup[i].id,
              data: neoDetails,
              coordinates: objectCoordinates,
              earthCoordinates: earthCoordinates 
            });
        } catch (error) {
            console.error(`Error fetching details for ID ${markup[i]}:`, error);
        }
    }
    console.log(objectDataList)
}