import { Box } from "@chakra-ui/react"
import styled, { keyframes, css } from 'styled-components'
import { useEffect, useState } from "react";

const bounce = keyframes`
  0% { 
    box-shadow: inset 0px -13px 20px 5px rgba(116, 124, 216, 0.12); 
    transform: scale(1); 
  }
  50% {
    box-shadow: inset 0px -13px 0px 0px rgba(0, 0, 0, 1);
    transform: scale(1.05);  
  }
  90% { 
    box-shadow: inset 0px -13px 20px 5px rgba(116, 124, 216, 0.12);
    transform: scale(1);  
  }
`;

const AnimatedBox = styled(Box)`
  ${() => css`
    animation: ${bounce} 4s infinite ease;
  `}
`;

const Shadow = () => {
    const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {

    setIsAnimating(true);


    const timer = setInterval(() => {
      setIsAnimating(false); 
      setTimeout(() => {
        setIsAnimating(true); 
      }, 0); 
    }, 20000);


    return () => clearInterval(timer);
  }, []);
  return (
    <AnimatedBox
      isAnimating={isAnimating}
      marginTop='40px'
      height={{ sm: '320px', md: '300px', lg: '200px', xl: '200px', '2xl': '40px' }}
      overflow='hidden'
      borderRadius='50%'
      alignItems='center'
      justifyContent='center'
      boxShadow='inset 0px -13px 20px 5px rgb(116 124 216 / 12%)'
      display="flex"  
    >
      <Box
        width={{ sm: '320px', md: '300px', lg: '200px', xl: '200px', '2xl': '320px' }}
        height={{ sm: '320px', md: '300px', lg: '200px', xl: '200px', '2xl': '60px' }}
        boxShadow='inset 0px -14px 20px 7px rgb(116 124 216 / 44%)'
      />
    </AnimatedBox>
  )
}

export default Shadow;
