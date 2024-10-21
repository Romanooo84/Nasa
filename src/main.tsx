import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
  </BrowserRouter>
  
)
