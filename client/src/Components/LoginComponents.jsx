import React, { useState } from 'react'
import {
  FormControl,
  Box,
  FormLabel,
  Input,
  Divider,
  AbsoluteCenter,
  Button,
  useToast,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react'
// import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginComponents = () => {

  const toast = useToast();
  const [show1, setShow1] = useState(false)
  const handleClick1 = () => setShow1(!show1)
  const navigate = useNavigate();

  const [UserInput, SetUserInput] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    SetUserInput({
      ...UserInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", UserInput);
      if (data.login) {
        toast({
          title: 'Login Successfull',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        localStorage.setItem("ShopZa", data.userID);
        navigate("/")
      }
      else {
        toast({
          title: 'Login Failed',
          description: `${data.msg}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: "Someting went wrong",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <FormControl isRequired>
          <FormLabel>Enter Email</FormLabel>
          <Input type='email' name='email' onChange={handleChange} id='email-login' placeholder='Enter Email' />
          <FormLabel marginTop={"10px"} >Enter Password</FormLabel>
          <InputGroup size='md'>
            <Input
              id='password-login'
              pr='4.5rem'
              type={show1 ? 'text' : 'password'}
              placeholder='Enter password'
              onChange={handleChange}
              name='password'
            />
            <InputRightElement width='4.5rem'>
              <Button variant={"ghost"} className='but' h='1.75rem' size='sm' onClick={handleClick1}>
                {show1 ? <span className="material-symbols-outlined">
                  visibility_off
                </span> : <span className="material-symbols-outlined">
                  visibility
                </span>}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type='submit' width={"100%"} margin={"25px auto 0px auto"} >LOGIN</Button>
        </FormControl>
      </form>
      {/* <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter backgroundColor={'rgb(250, 250, 250)'} px='4'>
          OR
        </AbsoluteCenter>
      </Box>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }} */}
      {/* /> */}
    </>
  )
}
