import React from 'react';
import { Flex, Box, Text, Link } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="2rem"
      bg="gray.800"
      color="whitesmoke"
    >
      <Box mr={8} mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Connect with us:
        </Text>
        <Box>
          <Link href="#" mr={4}>
            Instagram
          </Link>
          <Link href="#" mr={4}>
            Twitter
          </Link>
          <Link href="#" mr={4}>
            Facebook
          </Link>
        </Box>
      </Box>
      <Box mr={8} mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Download our apps:
        </Text>
        <Box>
          <Link href="#" mr={4}>
            Web App
          </Link>
          <Link href="#" mr={4}>
            Desktop App
          </Link>
          <Link href="#" mr={4}>
            Android App
          </Link>
        </Box>
      </Box>
      <Box mr={8} mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Services:
        </Text>
        <Box>
          <Link href="#" mr={4}>
            Free Shipping
          </Link>
          <Link href="#" mr={4}>
            API Development
          </Link>
        </Box>
      </Box>
      <Box mr={8} mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          About Us:
        </Text>
        <Box>
          <Link href="#" mr={4}>
            Our Story
          </Link>
          <Link href="#" mr={4}>
            Contact Us
          </Link>
          <Link href="#" mr={4}>
            Careers
          </Link>
        </Box>
      </Box>
      <Box mr={8} mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Information:
        </Text>
        <Box>
          <Link href="#" mr={4}>
            FAQs
          </Link>
          <Link href="#" mr={4}>
            Privacy Policy
          </Link>
          <Link href="#" mr={4}>
            Terms & Conditions
          </Link>
        </Box>
      </Box>
      <Box mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Other Links:
        </Text>
        <Box>
          <Link href="#" mr={4}>
            Store Locations
          </Link>
          <Link href="#" mr={4}>
            Gift Cards
          </Link>
          <Link href="#" mr={4}>
            Blog
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

