import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { NavBar } from '../Components/NavBar';
import { Box, Button, Image, Textarea, Text } from "@chakra-ui/react";
import { Footer } from '../Components/Footer';
import { Section } from '../Components/Section';
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import img1 from "../Images/img1.png";
import img2 from "../Images/img2.png";
import img3 from "../Images/img3.png";
import IMG1 from "../Images/IMG1.png";
import IMG2 from "../Images/IMG2.png";
import IMG3 from "../Images/IMG3.png";
import MenCollection from "../Images/MenCollection.jpg";
import SpringCollection from "../Images/springCollection.mp4";
import WomenCollection from "../Images/WomensCollection.webp";
import ComingSoon from "../Images/ComingSoon.png";
import ShoeCollection from "../Images/Shoe1.avif";
import Bag from "../Images/BagCollection.avif";

const MotionBox = motion(Box);

const ScrollAnimation = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </MotionBox>
  );
};

export const Home = () => {
  return (
    <>
      <NavBar page="Home" />
      <Box>
        <ScrollAnimation>
          <Box className='image-container image_gallery1' >
            <Link to={"/summerCollection"} style={{ minWidth: "100vw", display: "block" }}>
              <Image id='img1' src={img1} />
            </Link>
            <Link to={"/summerCollection"} style={{ minWidth: "100vw", display: "block" }}>
              <Image id='img2' src={img2} />
            </Link>
            <Link to={"/summerCollection"} style={{ minWidth: "100vw", display: "block" }}>
              <Image id='img3' src={img3} />
            </Link>
          </Box>

          <Box className='image-container image_gallery' >
            <Link to={"/summerCollection"} style={{ maxHeight:"80vh",minWidth:"100vw", display: "block" }}>
              <Image id='img1' src={IMG1} />
            </Link>
            <Link to={"/summerCollection"} style={{ maxHeight:"80vh",minWidth:"100vw", display: "block" }}>
              <Image id='img2' src={IMG2} />
            </Link>
            <Link to={"/summerCollection"} style={{ maxHeight:"80vh",minWidth:"100vw", display: "block" }}>
              <Image id='img3' src={IMG3} />
            </Link>
          </Box>
        </ScrollAnimation>

        <ScrollAnimation>
          <Section type="Latest" />
        </ScrollAnimation>

        <ScrollAnimation>
          <Box marginTop={"10vh"} height={"80vh"} display={'flex'} width={"100vw"}>
            <Box height={'80vh'} width={"30vw"} display={'flex'} gap={"4vh"} alignItems={'center'} flexDirection={'column'}>
              <Link to={'MensCollection'} >
                <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"}>
                  <Box left={"50%"} width={'min-content'} bottom={"35%"} position={'absolute'} zIndex={2}>
                    <Text textColor={"white"} fontSize={'x-large'} fontWeight={"500"}>Mens Collection</Text>
                    <Link to={"MensCollection"}><button className='but'>Shop</button></Link>
                  </Box>
                  <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={MenCollection} />
                </Box>
              </Link>
              <Link to={'LatestCollection'} >
                <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"}>
                  <Box left={"50%"} width={'70%'} bottom={"35%"} position={'absolute'} zIndex={2}>
                    <Text textColor={"white"} fontSize={'x-large'} fontWeight={"500"} width={"65%"}>Get Upto 20% Off</Text>
                    <Link to={"LatestCollection"} ><button className='but'>Shop</button></Link>
                  </Box>
                  <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={ShoeCollection} objectPosition={"centre"} />
                </Box>
              </Link>
            </Box>

            <Box overflow={'hidden'} position={'relative'} width={"40vw"} height={"80vh"}>
              <Box left={"50%"} width={'min-content'} top={"50%"} transform={"translate(-50%, -50%)"} position={'absolute'} zIndex={2}>
                <Text textColor={"white"} fontSize={'large'} fontWeight={"500"}>Spring Collection</Text>
                <Link to={"summerCollection"} ><button className='but'>Shop</button></Link>
              </Box>
              <Link to={`summerCollection`} >
                <video className='ImageCollection' autoPlay muted loop controls={false} style={{
                  opacity: 0.9,
                  width: "40vw",
                  height: "80vh",
                  objectFit: "cover"
                }} src={SpringCollection}></video>
              </Link>
            </Box>

            <Box height={'80vh'} width={"30vw"} display={'flex'} gap={"4vh"} alignItems={'center'} flexDirection={'column'}>
              <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"}>
                <Link to={"LatestCollection"}>
                  <Box right={"40%"} display={'flex'} flexDirection={'column'} justifyContent={'end'} bottom={"35%"} position={'absolute'} zIndex={2}>
                    <Text textColor={"white"} fontSize={'large'} fontWeight={"500"}>Buy 1 Get 1 Free</Text>
                    <Link to={"LatestCollection"}><button className='but'>Shop</button></Link>
                  </Box>
                  <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={WomenCollection} />
                </Link>
              </Box>
              <Box overflow={'hidden'} position={'relative'} height={"38vh"} width={"26vw"}>
                <Link to={"WomensCollection"}>
                  <Box right={"30%"} display={'flex'} flexDirection={'column'} justifyContent={'end'} bottom={"35%"} position={'absolute'} zIndex={2}>
                    <Text textColor={"white"} fontSize={'large'} fontWeight={"500"}>Womens Collection</Text>
                    <Link to={"WomensCollection"} ><button className='but'>Shop</button></Link>
                  </Box>
                  <Image opacity={0.9} cursor={'pointer'} className='ImageCollection' height={"38vh"} width={"26vw"} objectFit={'cover'} src={Bag} />
                </Link>
              </Box>
            </Box>
          </Box>
        </ScrollAnimation>

        <ScrollAnimation>
          <Section type="Mens" />
        </ScrollAnimation>

        <ScrollAnimation>
          <Section type="Womens" />
        </ScrollAnimation>

        <ScrollAnimation>
          <Image id='coming-soon' width={"100vw"} margin={"5vh 0px"} opacity={0.8} src={ComingSoon} />
        </ScrollAnimation>

        <ScrollAnimation>
          <Box display={'flex'} padding={"10vh 0px 8vh 0px"} id='email' >
            <Box className='email-child' display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <Text textAlign={'center'} fontSize={'xxx-large'} fontWeight={500}>Shop<span style={{ color: "red" }}>Za</span></Text>
              <Text textAlign={'center'} fontSize={'large'} opacity={0.7}>Where Comfort Meets Style</Text>
              <Text textAlign={'center'} opacity={0.5}>Send Your Feedback</Text>
            </Box>
            <Box className='email-child' display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap={"15px"}>
              <Textarea margin={'auto'} display={'block'} width={"80%"} placeholder='Enter Your Feed Back Here !!'></Textarea>
              <Button display={'block'} variant={"outline"} margin={'auto'}>Send</Button>
            </Box>
          </Box>
        </ScrollAnimation>

      </Box>
      <Footer />
    </>
  );
};
