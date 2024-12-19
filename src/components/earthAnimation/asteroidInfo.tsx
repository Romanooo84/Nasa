import { useEffect, useState } from "react";
import { Flex, Text} from "@chakra-ui/react";
import Select from "react-select"

interface Coordinate {
    x: number;
    y: number;
    z: number;
    id: string;
    asteroidInfo: {
        orbital_data:{
            first_observation_date:string
            last_observation_date:string,
            orbital_period:number,
            orbit_determination_date:string
            orbit_class:{
                orbit_class_description:string
            }
        },
        estimated_diameter:{
            meters:{
                estimated_diameter_max:number
            },
            miles:{
                estimated_diameter_max:number
            },
            feet:{
                estimated_diameter_max:number
            }
        }
        close_approach_data:string,
        designation:string, 
        absolute_magnitude_h:string
        is_potentially_hazardous_asteroid:boolean,
        
    }

  }
  

interface CoordinatesProps {
    coordinates: Coordinate[];
  }
  
 
  
  const AsteroidInfo: React.FC<CoordinatesProps>  = ({coordinates}) => {

    const [info, setInfo]=useState<JSX.Element[] | null>(null)
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);
    


    useEffect(()=>{
        if(coordinates && coordinates.length > 0){
            let idtempList: { label: string; value: string }[]=[]
            const markup = coordinates.map(item=>{
                const id = item.asteroidInfo.designation
                idtempList.push(
                    {label: `${id}`, value: `${id}`})
                return(
                    <>
                    <Flex key={id}
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
                            <Text>Orbital period </Text>
                            <Text>{`${Math.floor(item.asteroidInfo.orbital_data.orbital_period)} days`}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>First observation date </Text>
                            <Text>{item.asteroidInfo.orbital_data.first_observation_date}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>Last observation date </Text>
                            <Text>{item.asteroidInfo.orbital_data.last_observation_date}</Text>
                        </Flex>
                        <Flex gap='10px'>
                            <Text>Orbit Determination Date </Text>
                            <Text>{item.asteroidInfo.orbital_data.orbit_determination_date}</Text>
                        </Flex>
                    </Flex>
                    </>
                )
            })
            setInfo(markup)
            setOptions(idtempList)
        }
    },[coordinates, setOptions])

    const onChange = (selected: SingleValue<{ label: string; value: string }>) => {
        setSelectedOption(selected);
        console.log("Selected option:", selected);
      };

    return (
            <Flex flexDirection='column'>
                 <Select   placeholder={'wpisz cos'} value={selectedOption} options={options} onChange={onChange} //onInputChange={onInputChange} 
                 />
                {info}
            </Flex>
            )
  }

  export default AsteroidInfo;