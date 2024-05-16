import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { Box, Button, Text, useToast } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { LoginComponents } from '../Components/LoginComponents'
import { SignUp } from '../Components/SignUp'

export const Login = () => {

  const [userID, SetUserId] = useState("")
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem("ShopZa")) {
      SetUserId(localStorage.getItem("ShopZa"))
    }
  })

  return (
    <>
      <NavBar page="Login" />
      <Box backgroundColor={'rgb(250, 250, 250)'} boxShadow={"2px 2px 10px lightgrey"} width={"60%"} margin={'50px auto'} padding={"20px"} >
        {userID !== "" ?
          <Box>
            <Box textAlign="center" mt={10}>
              <Text fontSize="2xl">Already leaving?</Text>
              <Text fontSize="lg" margin={"10px"}>We'll miss you! 😢</Text>
            </Box>
            <Button onClick={() => {
              localStorage.clear()
              toast({
                title: 'Logout Successfull',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
              SetUserId("");
            }} backgroundColor={"rgb(255, 44, 44)"} color={'whitesmoke'} margin={'15px auto'} display={'block'} >Logout</Button>
          </Box>
          :
          <>
            <Tabs variant='soft-rounded' colorScheme='blue'>
              <TabList>
                <Tab width={"50%"} >LOGIN</Tab>
                <Tab width={"50%"} >SIGNUP</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LoginComponents />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        }
      </Box>
    </>
  )
}
