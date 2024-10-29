import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './hooks/DataContext.tsx'
import App from './App.tsx'

import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1450px',
}

const theme = extendTheme({ breakpoints });


createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/Nasa">
    <DataProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </DataProvider>
  </BrowserRouter>
  
)
