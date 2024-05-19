import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Divider,
    Box,
    AbsoluteCenter,
    InputGroup,
    InputRightElement,
    Input,
    Button,
    Checkbox,
    useToast,
    Text
} from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
    const [show1, setShow1] = useState(false)
    const handleClick1 = () => setShow1(!show1)
    const [show2, setShow2] = useState(false)
    const handleClick2 = () => setShow2(!show2)
    const toast = useToast();
    const navigate = useNavigate();
    const [Loading, SetLoading] = useState(false);

    const [UserInput, SetUserInput] = useState({
        email: "",
        password: "",
        confirm_password: ""
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
            SetLoading(true)
            const { data } = await axios.post("http://localhost:3000/api/signup", UserInput);
            if (data.signup) {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                localStorage.setItem("ShopZa", data.userID);
                navigate("/")
            }
            else {
                toast({
                    title: 'SignUp Failed',
                    description: `${data.msg}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            SetLoading(false);
        } catch (error) {
            toast({
                title: 'SignUp Failed',
                description: "Something went wrong",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <FormControl isRequired>
                    <FormLabel>Enter Email</FormLabel>
                    <Input autoComplete='on' id='email-signup' type='email' onChange={handleChange} value={UserInput.email} name='email' placeholder='Enter Email' />

                    <FormLabel marginTop={"10px"} >Enter Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            autoComplete='on'
                            id='password-signup'
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

                    <FormLabel marginTop={"10px"} >Enter Confirm Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            autoComplete='on'
                            id='confirm_password-signup'
                            pr='4.5rem'
                            type={show2 ? 'text' : 'password'}
                            placeholder='Enter Confirm password'
                            name='confirm_password'
                            onChange={handleChange}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button variant={"ghost"} h='1.75rem' size='sm' onClick={handleClick2}>
                                {show2 ? <span className="material-symbols-outlined">
                                    visibility_off
                                </span> : <span className="material-symbols-outlined">
                                    visibility
                                </span>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Checkbox isRequired display={'flex'} alignItems={'center'} margin={"15px 15px 5px 15px"} >
                        <Text id='checkbox' >
                            By checking this box, I agree to the terms and conditions and privacy policy
                        </Text>
                    </Checkbox>
                    <Button isLoading={Loading} type='submit' width={"100%"} margin={"25px auto 0px auto"} >SIGNUP</Button>
                </FormControl>
            </form>
            <Box position='relative' padding='10'>
                <Divider />
                <AbsoluteCenter backgroundColor={'rgb(250, 250, 250)'} px='4'>
                    OR
                </AbsoluteCenter>
            </Box>
        </>
    )
}
