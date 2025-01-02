import { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Select, { SingleValue } from "react-select";
import css from './asteroidInfo.module.css'
import { useCustomStyles } from "../../hooks/customStyles";

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

interface Asteroid {
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

interface Data {
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

interface CoordinatesProps {
  coordinates: Data[];
}

let missDistance: CloseApproachData["miss_distance"] | null;
let relativeVelocity: CloseApproachData["relative_velocity"] | null;



const AsteroidInfo: React.FC<CoordinatesProps> = ({ coordinates }) => {
  const [info, setInfo] = useState<JSX.Element[] | null>(null);
  const [originInfo, setOriginInfo] = useState<JSX.Element[] | null>(null);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

  const customStyles=useCustomStyles()

  const AsteroidDetails: React.FC<{ item: Asteroid }> = ({ item }) => {
    try {
      const firstDay = item.asteroidInfo.orbital_data.first_observation_date;
      const newFirstDay = new Date(firstDay);
      newFirstDay.setDate(newFirstDay.getDate() - 1);
      const lastDay = item.asteroidInfo.orbital_data.last_observation_date;
      const newLastDay = new Date(lastDay);
      newLastDay.setDate(newLastDay.getDate() + 1);
    

      item.asteroidInfo.close_approach_data.find((date: CloseApproachData) => {
        const foundDate = date.close_approach_date;
        const newFoundDate = new Date(foundDate);

        if (newFoundDate >= newFirstDay && newFoundDate <= newLastDay) {
          missDistance = date.miss_distance;
          relativeVelocity = date.relative_velocity;
          return true;
        }
        return false;
      });
    return (
      <Flex key={`asteroid-${item.asteroidInfo.designation}`}
      data-key={`asteroid-${item.asteroidInfo.designation}`}
        flexDirection="row"
        marginTop='60px'
        gap="10px"
        boxShadow='0px 10px 30px -5px rgb(116 124 216 / 56%)'>
        <Flex gap="10px"
          flexDirection="column"
          width="300px"
          key={`${item.asteroidInfo.designation}-column1`}
              data-key={`${item.asteroidInfo.designation}-column1`}>
          {[
            "Designation:",
            "Description:",
            "Absolute magnitude (h):",
            "Estimated diameter:",
            missDistance && relativeVelocity && "Miss distance:",
            missDistance && relativeVelocity && "Relative velocity:",
            "Is potentially hazardous asteroid:",
            "Orbital period:",
            "First observation date:",
            "Last observation date:",
            "Orbit determination date:",
          ]
            .filter(Boolean) // Usunięcie wartości `false` w przypadku warunkowych
            .map((text, index) => (
              <Text  style={{
                backgroundColor: index % 2 === 0 ? "#4545db2b" : "black"
              
              }}>
                {text}
              </Text>
            ))}
        </Flex>
        <Flex flexDirection='column'
          gap='10px'
          alignItems='center'
          width='600px'
          className={css.asteroidInfo}
          key={`${item.asteroidInfo.designation}key`}
          data-key={`${item.asteroidInfo.designation}key`}>
          <Text>{item.asteroidInfo.designation}</Text>
          <Text>{item.asteroidInfo.orbital_data.orbit_class.orbit_class_description}</Text>
          <Text>{item.asteroidInfo.absolute_magnitude_h}</Text>
          <Flex flexDirection="row"
            gap='40px'
          >
            <Text>{`${item.asteroidInfo.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters`}</Text>
            <Text>{`${item.asteroidInfo.estimated_diameter.miles.estimated_diameter_max.toFixed(2)} miles`}</Text>
            <Text>{`${item.asteroidInfo.estimated_diameter.feet.estimated_diameter_max.toFixed(2)} feet`}</Text>
          </Flex>
          {missDistance && relativeVelocity && (
            <>
              <Flex flexDirection="row"
                gap='40px'
              >
                <Text>{`${missDistance.kilometers} kilometers`}</Text>
                <Text>{`${missDistance.miles} miles`}</Text>
              </Flex>
              <Flex flexDirection="row"
                gap='40px'
              >
                <Text>{`${relativeVelocity.kilometers_per_hour} km/h`}</Text>
                <Text>{`${relativeVelocity.miles_per_hour} mph`}</Text>
              </Flex>
            </>
          )}
          <Text>{item.asteroidInfo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</Text>
          <Text>{`${Math.floor(item.asteroidInfo.orbital_data.orbital_period)} days`}</Text>
          <Text>{item.asteroidInfo.orbital_data.first_observation_date}</Text>
          <Text>{item.asteroidInfo.orbital_data.last_observation_date}</Text>
          <Text>{item.asteroidInfo.orbital_data.orbit_determination_date}</Text>
        </Flex>
      </Flex>
    );
    } catch (error)
    {console.log(error)}
};

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const idtempList: { label: string; value: string }[] = [];
      const markup = coordinates.map((item) => {
        const id = item.asteroidInfo.designation;
        idtempList.push({ label: `${id}`, value: `${id}` });
        return <AsteroidDetails key={id} item={item} />;
      });
      setInfo(markup);
      setOriginInfo(markup);
      setOptions(idtempList);
    }
  }, [coordinates, setOptions]);

  const onChange = (selected: SingleValue<{ label: string; value: string }>) => {
    setSelectedOption(selected);

    if (selected?.value && coordinates && coordinates.length > 0) {
      const tempInfo = coordinates.filter(
        (item) => item.asteroidInfo.designation === selected.value
      );
      const markup = tempInfo.map((item) => <AsteroidDetails key={item.asteroidInfo.designation} item={item} />);
      setInfo(markup);
    } else if (selected === null) {
      setInfo(originInfo);
    }
  };

  return (
    <Flex flexDirection="row"
    gap='40px'>
      <Box
        marginTop='60px'
        textColor='#b1a8a8'>
        <Select
          isClearable={true}
          placeholder={"Select object"}
          value={selectedOption}
          options={options}
          onChange={onChange}
          styles={customStyles}
        />
      </Box>
      <Flex
      flexDirection="column"
      textColor='#b1a8a8'>
      {info}
      </Flex>
    </Flex>
  );
};

export default AsteroidInfo;
