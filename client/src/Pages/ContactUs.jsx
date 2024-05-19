import React from "react";
import { Box, Heading, Stack, Text, Grid, GridItem, Link, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { NavBar } from "../Components/NavBar";

const MotionBox = motion(Box);

export const ContactUs = () => {
  return (
    <>
      <NavBar />
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        p={8}
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h1" size="xl" textAlign="center" mb={8}>
          Contact Us
        </Heading>
        <Stack spacing={4} align="center">
          <SocialLink link={"https://x.com/zara_care?lang=en"} icon={<FaTwitter />} username="@ShopZa" platform="Twitter" />
          <SocialLink link={"https://www.instagram.com/zara/"} icon={<FaInstagram />} username="@ShopZa" platform="Instagram" />
        </Stack>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mt={8} alignItems="center">
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              textAlign="center"
            >
              <Box>
                <Icon as={FaEnvelope} boxSize={8} mb={4} />
                <Text fontWeight="bold">Email Us</Text>
                <Link href="mailto:vedantdewangan75@gmail.com" color="teal.500">shopza@gmail.com</Link>
              </Box>
            </MotionBox>
          </GridItem>
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              textAlign="center"
            >
              <Box>
                <Icon as={FaMapMarkerAlt} boxSize={8} mb={4} />
                <Text fontWeight="bold">Visit Us</Text>
                <Text>JVLR, Opp. L&T, Powai,</Text>
                <Text>Mumbai, Maharashtra 400076</Text>
              </Box>
            </MotionBox>
          </GridItem>
        </Grid>
      </MotionBox>
    </>
  );
};

const SocialLink = ({ icon, username, platform, link }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      textAlign="center"
    >
      <Link href={`${link}`} isExternal color="teal.500" display="flex" alignItems="center">
        {icon}
        <Text ml={2}>{username}</Text>
      </Link>
    </MotionBox>
  );
};
