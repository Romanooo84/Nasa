
import AsteroidInfo from "./asteroidInfo"
import EarthAnimation from "./earthAnimation"
import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { asteroidCoordinates } from "../../hooks/download"
import css from './asteroidInfo.module.css'

interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}


interface CoordinatesData {
  x: number;
    y: number;
    z: number;
    id: string;
    asteroidInfo: {
      orbital_data: {
        first_observation_date: string;
        last_observation_date: string;
        orbital_period: number;
        orbit_determination_date: string;
        orbit_class: {
          orbit_class_description: string;
        };
      };
      estimated_diameter: {
        meters: {
          estimated_diameter_max: number;
        };
        miles: {
          estimated_diameter_max: number;
        };
        feet: {
          estimated_diameter_max: number;
        };
      };
      close_approach_data: CloseApproachData[];
      designation: string;
      absolute_magnitude_h: string;
      is_potentially_hazardous_asteroid: boolean;
    };
}



const NearObjectDetails = () => {
       const [coordinates, setCoordinates] = useState<CoordinatesData[]>([])

    useEffect(() => {
      const fetchData = async () => {
        const downloadedData: CoordinatesData[] = await asteroidCoordinates(); // Assuming the API returns a Scaled[] array
        if (downloadedData) {
          // Map the Scaled[] data to the Data[] structure
          const mappedData: CoordinatesData[] = downloadedData.map(item => ({
            x: item.x,
            y: item.y,
            z: item.z,
            id: item.id,
            asteroidInfo: item.asteroidInfo, // Ensure asteroidInfo is included
          }));
          setCoordinates(mappedData);
        }
      };
      fetchData();
    }, []);
    return (
        <Flex
          justifyContent='center'
          flexDirection='column'
            align='center'
        className={css.NODmainDiv}>
            {coordinates && (<EarthAnimation coordinates={coordinates} />)}
            {coordinates && (<AsteroidInfo coordinates={coordinates} />)}
          </Flex>

    )
}

export default NearObjectDetails