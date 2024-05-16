import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={"436094107256-7adqnt2kqjpd44nfqm9m0gcmdh22tasj.apps.googleusercontent.com"} >
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </GoogleOAuthProvider>
)