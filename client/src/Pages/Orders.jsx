import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { UserNotLogin } from '../Components/UserNotLogin';
import { Box, Text, Flex, Button, Badge, Image, Skeleton } from '@chakra-ui/react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

export const Orders = () => {

  const [userID, SetUserID] = useState("");
  const [AllOrder, SetAllOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("ShopZa")) {
      SetUserID(localStorage.getItem("ShopZa"))
    }
  }, [])

  const getAllOrder = async () => {
    SetLoading(true);
    const { data } = await axios.get(`http://localhost:3000/api/getAllOrder?userID=${localStorage.getItem("ShopZa")}`)
    SetLoading(false);
    SetAllOrder(data);
  }

  const [Loading,SetLoading] = useState(false);

  useEffect(() => {
    getAllOrder();
  }, [])

  return (
    <>
      <NavBar page="Orders" />
      {userID === "" ?
        <UserNotLogin />
        :
        AllOrder.length === 0 ?
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="50vh"
            color="gray.600"
            textAlign="center"
            px={4}
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} mb={4}>
              Oops! You haven't placed any orders yet.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
              Looks like you haven't placed any orders yet. <br />
              Start exploring our amazing products and place your first order!
            </Text>
            <Button size="lg" onClick={() => { navigate("/") }} mt={4}>
              Start Shopping
            </Button>
          </Flex>
          :
          <Box px={{ base: 2, md: 6 }} overflow={'hidden'} >
            <TableContainer width={"98vw"} height={"88vh"} >
              <Table variant='simple'>
                <Thead>
                  <Tr >
                    <Th >SNO</Th>
                    <Th >ORDER ID</Th>
                    <Th >PRODUCT DETAILS</Th>
                    <Th>TOTAL PRICE</Th>
                    <Th >DELIVERY</Th>
                    <Th>PAYMENT STATUS</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Loading?
                  <>
                  <Box>
                    <Skeleton height={"100px"} />
                  </Box>
                  </>
                  :AllOrder.map((order, i) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{order.order_id}</Td>
                      <Td>
                        {order.ProductDetails.map((product, index) => (
                          <Link to={`/product/${product._id}`} key={index}>
                            <Box display="flex" p={4} gap={4}>
                              <Image src={product.Images[0]} height="100px" />
                              <Box>
                                <Text>{product.title}</Text>
                                <Text fontSize="sm">{product.description}</Text>
                                <Text fontSize="sm">Selected Size: {product.selectedSize}</Text>
                                <Text fontSize="sm">Price: {product.newPrice}</Text>
                              </Box>
                            </Box>
                          </Link>
                        ))}
                      </Td>
                      <Td>{order.amount}</Td>
                      <Td>
                        <Badge variant='solid' colorScheme='green'>
                          DELIVERED
                        </Badge>
                      </Td>
                      <Td>
                        <Badge variant='solid' colorScheme='green'>
                          PAID
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
      }
    </>
  )
}
