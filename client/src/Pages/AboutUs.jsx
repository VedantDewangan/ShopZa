import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { NavBar } from "../Components/NavBar";
import backGround from "../Images/Background.jpg";
import ourv from "../Images/OurV.avif";
import oura from "../Images/OurA.webp";
import { useInView } from 'react-intersection-observer';
import { Footer } from "../Components/Footer";

const MotionBox = motion(Box);

const AboutUsSection = ({ children }) => {
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

export const AboutUs = () => {
  return (
    <>
      <NavBar />
      <Box p={8} position="relative">

        <Box id="about3" position={"absolute"} backgroundColor={"#D5DADE"} height={"200px"} width={"200px"} borderRadius={"20px"} top={"18vh"} left={"-50px"} transform={"rotate(35deg)"} />
        <Box id="about2" height={"200px"} width={"200px"} position={"absolute"} display={"flex"} alignItems={"center"} justifyContent={"center"} right={"-20px"} top={"110vh"} border={"8px solid black"} zIndex={2} opacity={0.55} borderRadius={"10px"} transform={"rotate(-45deg)"} >
          <Box height={"180px"} width={"180px"} position={"absolute"} backgroundColor={"transparent"} border={"2px solid black"} borderRadius={"4px"} />
        </Box>

        <Heading as="h1" size="xl" textAlign="center" mb={8}>
          About Us
        </Heading>

        <AboutUsSection>
          <Box id="about1" display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"10vw"}>
            <Box>
              <Text fontSize={"4em"}>
                Shop<span style={{ color: 'red' }}>Za</span>
              </Text>
              <Text opacity={0.9}>
                Where Comfort Meets Style
              </Text>
            </Box>
            <Image borderRadius={"30px"} height={"50vh"} src={backGround} />
          </Box>
        </AboutUsSection>

        <AboutUsSection>
          <Box backgroundColor={"#D5DADE"} id="33" borderRadius={"10px"} padding={"30px 0px"} margin={"10vh 0px"} opacity={0.9}>
            <Text textAlign={"center"} fontSize={"1.8em"} fontWeight={"500"}>
              Who We Are
            </Text>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"} margin={"20px 0px"}>
              <Box>
                <Text fontSize={"1.6em"} fontWeight={"400"}>
                  <span>Vedant Dewangan</span>
                </Text>
                <Text fontSize={"1.1em"} fontWeight={"400"}>
                  <span>Founder And CEO of ShopZa</span>
                </Text>
              </Box>
            </Box>
            <Text fontSize={"1em"} fontWeight={"400"} padding={"10px 12%"} marginBottom={"30px"} textAlign={"center"}>
              Welcome to our newly established e-commerce company, where we are committed to offering the highest quality clothing at affordable prices. Founded by Vedant Dewangan, our startup has rapidly grown into a team of 150 dedicated professionals. Our mission is to provide exceptional services, including free shipping on all online orders and swift delivery, ensuring a seamless shopping experience for our customers. Join us as we redefine the standards of online shopping with our outstanding products and customer-centric approach.
            </Text>
          </Box>
        </AboutUsSection>

        <AboutUsSection>
          <Box display={"flex"} id="about4" alignItems={"center"} justifyContent={"center"} margin={"5vh 0px 15vh 0px"} flexDirection={"row"}>
            <Box height={"50vh"} className="abt45" >
              <Image src={ourv} height={"100%"} objectFit={"cover"} width={"90%"} />
            </Box>
            <Box className="about45" >
              <span style={{ fontSize: "1.6em", fontWeight: 400, display: "block" }}>
                Our <span style={{ color: "red" }}>Vision</span>
              </span>
              <span style={{ fontSize: "1.1em" }}>
                At ShopZa, our vision is to revolutionize e-commerce by offering high-quality, affordable clothingb to a diverse global audience. We aim to make fashion accessible, sustainable, and inclusive for all. By embracing eco-friendly practices and innovative technologies, we strive to minimize our environmental impact and enhance the shopping experience. Our collections celebrate diversity and individuality, reflecting our commitment to inclusivity. We envision a future where everyone can enjoy stylish, comfortable clothing, and we are dedicated to maintaining transparency, integrity, and excellence in all we do.
              </span>
            </Box>
          </Box>
        </AboutUsSection>

        <AboutUsSection>
          <Box display={"flex"} alignItems={"center"} id="about5" justifyContent={"center"} gap={"10vw"} flexDirection={"row-reverse"}>
            <Box height={"50vh"} className="abt45">
              <Image src={oura} height={"100%"} objectFit={"cover"} width={"90%"} />
            </Box>
            <Box textAlign={"end"} className="about45" >
              <span style={{ fontSize: "1.6em", fontWeight: 400, display: "block" }}>
                Our <span style={{ color: "red" }}>Approach</span>
              </span>
              <span style={{ fontSize: "1.1em" }}>
                Our approach at ShopZa focuses on delivering exceptional value and customer satisfaction. We ensure high-quality by meticulously selecting materials and maintaining strict quality control. By optimizing our supply chain, we offer competitive prices without compromising on quality. Our user-friendly website and mobile app provide a seamless shopping experience, with responsive customer service and secure payment options. Fast, reliable delivery is a priority, with free shipping and real-time tracking. We are committed to understanding and anticipating our customers’ needs, ensuring a satisfying and enjoyable shopping experience.
              </span>
            </Box>
          </Box>
        </AboutUsSection>

      </Box>
      <Footer />
    </>
  );
};
