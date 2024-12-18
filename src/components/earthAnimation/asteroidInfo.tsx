import { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

interface Coordinate {
    x: number;
    y: number;
    z: number;
    id: string;

  }
  

interface CoordinatesProps {
    coordinates: Coordinate[];
  }
  
 
  
  const AsteroidInfo: React.FC<CoordinatesProps>  = ({coordinates}) => {

    const [info, setInfo]=useState<JSX.Element[] | null>(null)


    useEffect(()=>{
        console.log(coordinates)
        if(coordinates && coordinates.length > 0){
            const markup = coordinates.map(item=>{
                let firstObservationDate= item.asteroidInfo.orbital_data.first_observation_date
                let lastOnservationDate= item.asteroidInfo.orbital_data.last_observation_date
                firstObservationDate=Date.parse(firstObservationDate)
                lastOnservationDate = Date.parse(lastOnservationDate)
                console.log(firstObservationDate)
                console.log(lastOnservationDate)
                const closeAoproach = item.asteroidInfo.close_approach_data.filter(date=> {
                    console.log(Date.parse(date))
                    return(firstObservationDate<=Date.parse(date)&&Date.parse(date)<=lastOnservationDate)})
                console.log(closeAoproach)
                    
                return(
                    <Flex key={item.asteroidInfo.designation}
                        flexDirection='column'
                        >
                        <Flex gap='10px'>
                            <Text>Designation: </Text>
                            <Text>{item.asteroidInfo.designation}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>Description: </Text>
                            <Text>{item.asteroidInfo.orbital_data.orbit_class.orbit_class_description}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>{`Absolute magnitude (h)`}</Text>
                            <Text>{item.asteroidInfo.absolute_magnitude_h}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>Estimated diameter </Text>
                            <Flex flexDirection='column'>
                                <Text>{`${(item.asteroidInfo.estimated_diameter.meters.estimated_diameter_max).toFixed(2)} meters`}</Text>
                                <Text>{`${(item.asteroidInfo.estimated_diameter.miles.estimated_diameter_max).toFixed(2)} miles`}</Text>
                                <Text>{`${(item.asteroidInfo.estimated_diameter.feet.estimated_diameter_max).toFixed(2)} feet`}</Text>
                            </Flex>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>Is potentially hazardous asteroid: </Text>
                            <Text>{item.asteroidInfo.is_potentially_hazardous_asteroid===true? ('Yes'):('No')}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>First observation date </Text>
                            <Text>{item.asteroidInfo.orbital_data.first_observation_date}</Text>
                        </Flex>
                    </Flex>
                )
            })
            setInfo(markup)
        }
    },[coordinates])

    return <>{info}</>
  }

  export default AsteroidInfo;