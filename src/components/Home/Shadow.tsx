import { Flex, Box } from "@chakra-ui/react"

const Shadow=()=>{
    return(
        <Flex 
        marginTop='40px'
        height={{ sm: '320px', md: '300px', lg: '200px', xl: '200px', '2xl': '40px' }}
        overflow='hidden'
        borderRadius='50%'
        alignItems= 'center'
        justifyContent='center'
        boxShadow='inset 0px -13px 20px 5px rgb(116 124 216 / 12%)' 
        >
          <Box
              width={{ sm: '320px', md: '300px', lg: '200px', xl: '200px', '2xl': '320px' }}
              height={{ sm: '320px', md: '300px', lg: '200px', xl: '200px', '2xl': '60px' }}
              boxShadow='inset 0px -14px 20px 7px rgb(116 124 216 / 44%)' >

          </Box>
        </Flex>
    )
}

export default Shadow