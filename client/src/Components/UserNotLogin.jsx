import React, { useState } from "react";
import { Box, Heading, Text, Link, Badge, Flex, Image, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const UserNotLogin = () => {

  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h2" size="lg">Oops! You're not logged in!</Heading>
      <Text fontSize="lg" mt={4}>
        To view your orders, you need to be logged in.
      </Text>
      <Text fontSize="lg">
        Click <Link as={RouterLink} to="/login" color="blue.500">here</Link> to log in.
      </Text>
      <Text fontSize="lg">Or just enjoy this funny cat GIF while you're here!</Text>
      <Box mt={4}>
        <img
          src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
          alt="Funny Cat GIF"
          style={{ width: "300px", margin: "auto", borderRadius: "10px" }}
        />
      </Box>
    </Box>

  );
};