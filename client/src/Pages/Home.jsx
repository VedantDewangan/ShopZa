import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { Box, Button, Image, Textarea, Text } from "@chakra-ui/react"
import { Footer } from '../Components/Footer'
import { Section } from '../Components/Section'
import img1 from "../Images/img1.png"
import img2 from "../Images/img2.png"
import img3 from "../Images/img3.png"
import MenCollection from "../Images/MenCollection.jpg"
import SpringCollection from "../Images/SpringCollection.jpg"
import WomenCollection from "../Images/WomenCollection.webp"
import ComingSoon from "../Images/ComingSoon.png"
import ShoeCollection from "../Images/ShoesCollection.avif"
import Bag from "../Images/Bag.jpg"
import { Link } from "react-router-dom"

export const Home = () => {

  return (
    <>
      <NavBar page="Home" />

      <Box>

        <Box id='image-container'>
          <Link to={"/summerCollection"} style={{ minWidth: "100vw", display: "block" }} ><Image id='img1' src={img1} /></Link>
          <Link to={"/summerCollection"} style={{ minWidth: "100vw", display: "block" }} ><Image id='img2' src={img2} /></Link>
          <Link to={"/summerCollection"} style={{ minWidth: "100vw", display: "block" }} ><Image id='img3' src={img3} /></Link>
        </Box>

        <Section type="Latest" />

        <Box marginTop={"10vh"} height={"80vh"} display={'flex'} width={"100vw"} >
          <Box height={'80vh'} width={"30vw"} display={'flex'} gap={"4vh"} alignItems={'center'} flexDirection={'column'} >
            <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"} >
              <Box left={"50%"} width={'min-content'} bottom={"35%"} position={'absolute'} zIndex={2} >
                <Text textColor={"white"} fontSize={'x-large'} fontWeight={"500"} >Mens Collection</Text>
                <button className='but'>Shop</button>
              </Box>
              <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={MenCollection} />
            </Box>
            <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"} >
              <Box left={"20%"} width={'max-content'} bottom={"35%"} position={'absolute'} zIndex={2} >
                <Text textColor={"white"} fontSize={'x-large'} fontWeight={"500"} >Get Upto 20% Off</Text>
                <button className='but'>Shop</button>
              </Box>
              <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={ShoeCollection} objectPosition={"centre"} />
            </Box>
          </Box>
          <Box overflow={'hidden'} position={'relative'} width={"40vw"} height={"80vh"} >
            <Box left={"50%"} width={'min-content'} bottom={"35%"} position={'absolute'} zIndex={2} >
              <Text textColor={"white"} fontSize={'large'} fontWeight={"500"} >Mens Collection</Text>
              <button className='but'>Shop</button>
            </Box>
            <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' src={SpringCollection} width={"40vw"} height={"80vh"} objectFit={'cover'} />
          </Box>
          <Box height={'80vh'} width={"30vw"} display={'flex'} gap={"4vh"} alignItems={'center'} flexDirection={'column'} >
            <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"}>
              <Box left={"50%"} width={'min-content'} bottom={"35%"} position={'absolute'} zIndex={2} >
                <Text textColor={"white"} fontSize={'large'} fontWeight={"500"} >Mens Collection</Text>
                <button className='but'>Shop</button>
              </Box>
              <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={Bag} />
            </Box>
            <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"} >
              <Box left={"50%"} width={'min-content'} bottom={"35%"} position={'absolute'} zIndex={2} >
                <Text textColor={"white"} fontSize={'large'} fontWeight={"500"} >Mens Collection</Text>
                <button className='but'>Shop</button>
              </Box>
              <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={WomenCollection} />
            </Box>
          </Box>
        </Box>

        <Section type="Mens" />

        <Section type="Womens" />

        <Image id='coming-soon' width={"100vw"} margin={"5vh 0px"} opacity={0.8} src={ComingSoon} />

        <Box display={'flex'} padding={"10vh 0px 8vh 0px"} >
          <Box width={"50%"} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
            <Text textAlign={'center'} fontSize={'xxx-large'} fontWeight={500} >Shop<span style={{ color: "red" }}>Za</span></Text>
            <Text textAlign={'center'} fontSize={'large'} opacity={0.7} >Where Comfort Meets Style</Text>
            <Text textAlign={'center'} opacity={0.5} >Send Your Feedback</Text>
          </Box>
          <Box width={"50%"} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={"15px"} >
            <Textarea margin={'auto'} display={'block'} width={"80%"} placeholder='Enter Your Feed Back Here !!' >
            </Textarea>
            <Button display={'block'} variant={"outline"} margin={'auto'} >
              Send
            </Button>
          </Box>
        </Box>

      </Box>
      <Footer />
    </>
  )
}
