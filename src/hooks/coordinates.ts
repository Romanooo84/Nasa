

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