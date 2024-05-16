import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { UserNotLogin } from '../Components/UserNotLogin';
import { Text, Box, Button, Image, Flex, useToast, Input, Select } from "@chakra-ui/react"
import axios from "axios";
import RatingStar from "../Components/RatingStar"
import { Link, useNavigate } from "react-router-dom"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

export const Cart = () => {

  const [userID, SetUserID] = useState("");
  const [AllProduct, SetAllProduct] = useState([]);
  const [AllProductDetails, SetAllProductDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("ShopZa")) {
      SetUserID(localStorage.getItem("ShopZa"))
    }
  })

  useEffect(() => {
    const getCartItem = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/getCartItem?userID=${localStorage.getItem("ShopZa")}`)
      SetAllProduct(data);
      if (data.length !== 0) {
        var price = 0;
        var arr = [];
        for (const product of data) {
          const { data } = await axios.get(`http://localhost:3000/api/getProductDetails?productID=${product.productID}`);
          const a = data[0];
          a.quantity = product.quantity
          a.selectedSize = product.selectedSize
          price += a.newPrice + ((a.newPrice * 5) / 100)
          arr.push(a);
        }
        SetAllProductDetails(arr);
        SetTotalBill(price)
      }
    }
    getCartItem();
  }, [])

  const toast = useToast();
  const [newSelectedSize, SetNewSelectedSize] = useState("none");
  const [totalBill, SetTotalBill] = useState(0);
  const [Coupon, SetCoupon] = useState("");
  const [CouponValue, SetCouponValue] = useState(0);
  const [PaymentOption, SetPaymentOption] = useState("none")

  const addNewCart = async (size, product) => {
    if (newSelectedSize === "none") {
      toast({
        status: "error",
        title: "Please Select the size",
        isClosable: 5000
      })
    }
    else {
      if (size === newSelectedSize) {
        toast({
          status: "info",
          isClosable: 5000,
          title: "Item already in cart"
        })
      }
      else {
        var obj = product;
        obj.selectedSize = newSelectedSize

        await axios.post("http://localhost:3000/api/addItemToCart", {
          userID: localStorage.getItem("ShopZa"),
          productID: product._id,
          quantity: 1,
          selectedSize: product.selectedSize,
          availability: product.availability
        });

        SetAllProductDetails([...AllProductDetails, obj])
        var price = obj.newPrice + ((obj.newPrice * 5) / 100)
        SetTotalBill(pre => pre + price)

        toast({
          status: "success",
          title: "Itme Add to cart",
          isClosable: 5000
        })
      }
    }
  }

  const removeFromCart = async (i, product) => {
    await axios.delete(`http://localhost:3000/api/deleteFromCart?userID=${localStorage.getItem("ShopZa")}&productID=${product._id}&size=${product.selectedSize}`);
    SetAllProductDetails(prevDetails => {
      const updatedDetails = prevDetails.filter((item, index) => {
        if (index === i) {
          const price = item.newPrice + (item.newPrice * 5) / 100;
          SetTotalBill(prevTotalBill => prevTotalBill - price);
          return false;
        }
        return true;
      });
      return updatedDetails;
    });

    toast({
      status: "error",
      title: "Item deleted from cart",
      isClosable: 5000
    })
  };

  return (
    <>
      <NavBar page="Cart" />
      {userID === "" ?
        <UserNotLogin />
        :
        AllProduct.length === 0 ?
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="50vh"
            color="gray.600"
          >
            <Text fontSize="2xl" mb={4}>
              Oops! Your Cart is empty!
            </Text>
            <Text fontSize="lg" textAlign="center" mb={4}>
              Looks like you haven't added anything to your Cart yet. <br />
              Start exploring our amazing products and add them to your Cart!
            </Text>
            <Button size="lg" onClick={() => { navigate("/") }} mt={4}>
              Start Shopping
            </Button>
          </Flex>
          :
          <>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>SNO</Th>
                    <Th>IMAGE</Th>
                    <Th>TITLE</Th>
                    <Th>QUANTITY</Th>
                    <Th>PRICE</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    AllProductDetails.map((product, i) => {
                      return (
                        <Tr>
                          <Td textAlign={'center'} >
                            <Text>
                              {i + 1}
                            </Text>
                          </Td>
                          <Td width={"15%"}>
                            <Image width={"100%"} borderRadius={"20px"} objectFit={'cover'} objectPosition={'top'} src={product.Images[0]} />
                          </Td>
                          <Td>
                            <Box width={"50vw"} flexDirection={'column'} display={'flex'} paddingLeft={"20px"} borderRight={'none'}>
                              <Text fontSize={'larger'} >
                                {product.title}
                              </Text>
                              <Text fontSize={'medium'} >
                                {product.description}
                              </Text>
                              <Text fontSize={'small'} opacity={0.8} >
                                Selected SIze : {product.selectedSize}
                              </Text>
                              <Box fontSize={'small'}>
                                <RatingStar rating={2.6} />
                              </Box>
                              <Box>
                                <TableContainer>
                                  <Table variant='simple'>
                                    <Thead>
                                      <Tr>
                                        <Th>Name</Th>
                                        <Th>Price</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      <Tr fontSize={'smaller'} >
                                        <Td>Item Price X {product.quantity}</Td>
                                        <Td >{product.newPrice * (product.quantity)}</Td>
                                      </Tr>
                                      <Tr fontSize={'smaller'} >
                                        <Td>GST (5%) </Td>
                                        <Td>{
                                          ((product.newPrice * product.quantity) * 5) / 100
                                        }</Td>
                                      </Tr>
                                    </Tbody>
                                    <Tfoot>
                                      <Tr>
                                        <Th>Total</Th>
                                        <Th>
                                          {
                                            product.newPrice + ((product.newPrice * 5) / 100)
                                          }
                                        </Th>
                                      </Tr>
                                    </Tfoot>
                                  </Table>
                                </TableContainer>
                              </Box>
                              <Box>
                                <Text fontSize={'medium'} top={"25px"} >
                                  Add Item With Different Size
                                </Text>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
                                  <Box display={'flex'} gap={"10px"} margin={"20px 10px"} >
                                    {
                                      Object.keys(product.availability).map((size, i) => {
                                        return (
                                          <button
                                            key={`${product._id}abc${i * 41231 + 1}`}
                                            style={{
                                              fontSize: "15px",
                                              padding: "10px 20px",
                                              borderRadius: "10px",
                                              backgroundColor: `${newSelectedSize === size ? 'black' : "lightgray"}`,
                                              color: `${newSelectedSize === size ? "white" : "black"}`
                                            }} onClick={() => {
                                              newSelectedSize === size ? SetNewSelectedSize("none") :
                                                SetNewSelectedSize(size)
                                            }} >
                                            {size}
                                          </button>
                                        )
                                      })
                                    }
                                  </Box>
                                  <Box>
                                    <Button onClick={() => {
                                      addNewCart(product.selectedSize, product);
                                    }} >
                                      Add Item
                                    </Button>
                                    <Button onClick={() => {
                                      removeFromCart(i, product)
                                    }} margin={"0px 12px"} color={"white"} backgroundColor={"rgb(255, 44, 44)"} >
                                      Remove Item
                                    </Button>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Td>
                          <Td>
                            <Text textAlign={'center'} > {product.quantity}</Text>
                          </Td>
                          <Td>
                            <Text textAlign={'center'}>
                              {
                                product.newPrice + ((product.newPrice * 5) / 100)
                              }
                            </Text>
                          </Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>

            <Box display={'flex'} flexDirection={'column'} padding={"5vw 5vw 0px 5vw"} >
              <Text textAlign={'center'} fontSize={'larger'} padding={"10px 0px 20px 0px"} >
                Add Coupon
              </Text>
              <Box display={'flex'} >
                <Input onChange={(e) => { SetCoupon(e.target.value) }} placeholder='Enter Coupon Code'></Input>
                <Button onClick={() => {
                  if (Coupon === "MYFIRSTSHOPZA") {
                    SetCouponValue(500);
                  }
                }} >Add</Button>
              </Box>
            </Box>

            <Box display={'flex'} flexDirection={'column'} padding={"15px 5vw 5vh 5vw"} >
              <Text textAlign={'center'} fontSize={'larger'} padding={"10px 0px 20px 0px"} >
                Choose Payment Option
              </Text>
              <Select placeholder='Selct Payment Mode' onChange={(e) => {
                SetPaymentOption(e.target.value)
              }} >
                <option value={"cod"}>
                  Cash On Delivery
                </option>
                <option defaultChecked value={"op"} >
                  Online Payment
                </option>
              </Select>
            </Box>

            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th>Info</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>All Item Price</Td>
                    <Td>{totalBill}</Td>
                  </Tr>
                  <Tr>
                    <Td>Service Fee (6.6%)</Td>
                    <Td> + {Math.floor((totalBill * 6.6) / 100)}</Td>
                  </Tr>
                  <Tr style={{ display: CouponValue === 0 ? "none" : "flex" }} justifyContent={'space-between'} >
                    <Td width={"90vw"}>Coupon Discount</Td>
                    <Td >- {CouponValue}</Td>
                  </Tr>
                  <Tr style={{ display: PaymentOption === "cod" ? "none" : "flex" }} justifyContent={'space-between'} >
                    <Td width={"90vw"}>Cash On Delivery Charges</Td>
                    <Td >- {200}</Td>
                  </Tr>
                  <Tr>
                    <Td>Total Payment Amount</Td>
                    <Td>{totalBill + (Math.floor((totalBill * 6.6) / 100)) - CouponValue}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Button colorScheme='teal' display={'block'} margin={'10vh auto'} >
              Place Order
            </Button>
          </>
      }
    </>
  )
}