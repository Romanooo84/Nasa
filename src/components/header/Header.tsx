import { Box, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { SiNasa } from "react-icons/si";
import { Link} from "react-router-dom"

export const Header = () => {

    const [buttonsList] = useState<string[]>(['home', 'gallery']);
    const [render, setRender] = useState<JSX.Element[]>([]);
    
    
    useEffect(() => {
        const markup = buttonsList.map((button, index) => (
            <Link key={index} to={`/Nasa/${button}`}>
                <Button>{button}</Button>
            </Link>
        ));
        setRender(markup); // Ustawiamy wynik jako stan
    }, [buttonsList])

    return(
        <Box>
            <SiNasa />
            {render}
        </Box>
    )
}

export default Header