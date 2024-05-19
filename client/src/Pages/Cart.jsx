import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { UserNotLogin } from '../Components/UserNotLogin';
import { Text, Box, Button, Image, Flex, useToast, Skeleton } from "@chakra-ui/react"
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
import { motion } from 'framer-motion'

export const Cart = () => {

  const [userID, SetUserID] = useState("");
  const [AllProduct, SetAllProduct] = useState([]);
  const [AllProductDetails, SetAllProductDetails] = useState([]);
  const navigate = useNavigate();
  const [LoadingAllItem, SetLoadingAllItem] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("ShopZa")) {
      SetUserID(localStorage.getItem("ShopZa"))
    }
  })

  useEffect(() => {
    const getCartItem = async () => {
      SetLoadingAllItem(true);
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
      SetLoadingAllItem(false)
    }
    getCartItem();
  }, [])

  const toast = useToast();
  const [newSelectedSize, SetNewSelectedSize] = useState("none");
  const [totalBill, SetTotalBill] = useState(0);
  const [PaymentOption, SetPaymentOption] = useState("cod");
  const [LoadingAddCart, SetLoadingAddCart] = useState(false);
  const [LoadingRemoveCart, SetLoadingRemoveCart] = useState(false);

  const addNewCart = async (size, product) => {
    SetLoadingAddCart(true)
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
          title: "Item Add to cart",
          isClosable: 5000
        })
      }
      SetLoadingAddCart(false);
    }
  }

  const removeFromCart = async (i, product) => {
    SetLoadingRemoveCart(true);
    await axios.delete(`http://localhost:3000/api/deleteFromCart?userID=${localStorage.getItem("ShopZa")}&productID=${product._id}&size=${product.selectedSize}`);
    SetLoadingRemoveCart(false);
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

  const createBill = async (price, AllProduct) => {

    const { data } = await axios.post("http://localhost:3000/api/payment/checkout", {
      userID: localStorage.getItem("ShopZa"),
      ProductDetails: AllProductDetails,
      name: "Payment",
      amount: price
    });
    var options = {
      "key": "rzp_test_ZIIbSfegRnSEtJ",
      "amount": data.amount,
      "currency": data.currency,
      "name": "ShopZa",
      "description": "Test Transaction",
      "image": "https://postimg.cc/YLrSWN9D",
      "order_id": data.id,
      "callback_url": "http://localhost:3000/api/payment/payment-verification",
      "prefill": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "contact": "9876543210"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      },
      "handler": async (response) => {
        if (response) {
          const abc = await axios.put("http://localhost:3000/api/updateOrder", {
            order_id: data.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
          if (abc.data.payment) {
            const x = await axios.delete("http://localhost:3000/api/deleteCartItem", {
              params: {
                userID: localStorage.getItem("ShopZa")
              }
            })
            navigate("/orders")
          }
        }
      },
      "modal": {
        "ondismiss": function () {
          console.log("Payment form closed");
        }
      }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  return (
    <>
      <NavBar page="Cart" />
      {userID === "" ?
        <UserNotLogin />
        :
        LoadingAllItem ?
          <Box height={"100vh"} marginTop={"40px"} >
            <Skeleton height='50vh' margin={"0px 30px"} />
            <Skeleton height='20vh' margin={"10px 30px"} />
          </Box>
          :
          AllProductDetails.length === 0 ?
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
                      <Th className='cart'>SNO</Th>
                      <Th className='cart-image' >IMAGE</Th>
                      <Th>TITLE</Th>
                      <Th className='cart' >QUANTITY</Th>
                      <Th >PRICE</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      AllProductDetails.map((product, i) => {
                        return (
                          <motion.tr
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            key={product._id}
                          >
                            <Td textAlign={'center'} className='cart' >
                              <Text>
                                {i + 1}
                              </Text>
                            </Td>
                            <Td width={"15%"} className='cart-image' >
                              <Link to={`/product/${product._id}`} >
                                <Image width={"100%"} borderRadius={"20px"} objectFit={'cover'} objectPosition={'top'} src={product.Images[0] ? product.Images[0] : "sdca"} />
                              </Link>
                            </Td>
                            <Td>
                              <Box width={"50vw"} flexDirection={'column'} display={'flex'} paddingLeft={"20px"} borderRight={'none'}>
                                <Link to={`/product/${product._id}`} >
                                  <Text fontSize={'larger'} className='cart-title' >
                                    {product.title}
                                  </Text>
                                  <Text fontSize={'medium'} className='cart-title' >
                                    {product.description}
                                  </Text>
                                  <Text fontSize={'small'} opacity={0.8} className='cart-title' >
                                    Selected Size : {product.selectedSize}
                                  </Text>
                                  <Box fontSize={'small'} className='cart-title' >
                                    <RatingStar rating={2.6} />
                                  </Box>
                                </Link>
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
                                  <Text className='cart-title' fontSize={'medium'} top={"25px"} >
                                    Add Item With Different Size
                                  </Text>
                                  <Box display={'flex'} alignItems={'center'} className='cart-button cart-title' justifyContent={'space-between'} >
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
                                      <Button isLoading={LoadingAddCart} onClick={() => {
                                        addNewCart(product.selectedSize, product);
                                      }} >
                                        Add Item
                                      </Button>
                                      <Button isLoading={LoadingRemoveCart} onClick={() => {
                                        removeFromCart(i, product)
                                      }} margin={"0px 12px"} color={"white"} backgroundColor={"rgb(255, 44, 44)"} >
                                        Remove Item
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Td>
                            <Td className='cart' >
                              <Text textAlign={'center'} > {product.quantity}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>
                                {
                                  product.newPrice + ((product.newPrice * 5) / 100)
                                }
                              </Text>
                            </Td>
                          </motion.tr>
                        )
                      })
                    }
                  </Tbody>
                </Table>
              </TableContainer>

              <Box display={'flex'} flexDirection={'column'} padding={"15px 5vw 5vh 5vw"} >
                <Text textAlign={'center'} fontSize={'larger'} padding={"10px 0px 20px 0px"} >
                  Choose Payment Option
                </Text>
                <Box display={'flex'} padding={"20px"} gap={"30px"} >
                  <Box onClick={() => { SetTotalBill(prev => prev + 200); SetPaymentOption("op") }} cursor={'pointer'} color={PaymentOption === "op" ? 'white' : 'black'} backgroundColor={PaymentOption === "op" ? 'black' : 'lightgrey'} width={'max-content'} padding={"20px"} >
                    CASH ON DELIVERY
                  </Box>
                  <Box onClick={() => { SetTotalBill(prev => prev - 200); SetPaymentOption("cod") }} cursor={'pointer'} color={PaymentOption === "cod" ? 'white' : 'black'} backgroundColor={PaymentOption === "cod" ? 'black' : 'lightgrey'} width={'max-content'} padding={"20px"} >
                    ONLINE PAYMENT
                  </Box>
                </Box>
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
                    <Tr style={{ textDecoration: PaymentOption === "cod" ? "line-through" : "none" }} justifyContent={'space-between'} >
                      <Td>Cash On Delivery Charges</Td>
                      <Td >+ {200}</Td>
                    </Tr>
                    <Tr>
                      <Td>Total Payment Amount</Td>
                      <Td>{totalBill + (Math.floor((totalBill * 6.6) / 100))}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Button colorScheme='teal' onClick={() => {
                if (PaymentOption === "op") {
                  toast({
                    status: "error",
                    title: "Cash On Delivery Unavailable",
                    description: "Please choose another payment method."
                  })
                }
                else {
                  createBill(totalBill + (Math.floor((totalBill * 6.6) / 100)), AllProductDetails);
                }
              }} display={'block'} margin={'10vh auto'} >
                Place Order
              </Button>
            </>
      }
    </>
  )
}
