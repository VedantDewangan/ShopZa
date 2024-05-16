import React, { useEffect, useState } from 'react'
import { NavBar } from '../Components/NavBar'
import { UserNotLogin } from '../Components/UserNotLogin';
import axios from "axios";
import { SingleCard } from "../Components/SingleCard.jsx"
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Wishlist = () => {

  const [AllWishListProduct, SetAllWishListProduct] = useState([]);
  const [userID, SetUserID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("ShopZa")) {
      SetUserID(localStorage.getItem("ShopZa"))
    }
  })

  const getAllWishList = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/getAllWishList?userID=${localStorage.getItem("ShopZa")}`)
    SetAllWishListProduct(data);
  }
  useEffect(() => {
    getAllWishList();
  }, [])

  const removeFromWishList = (index) => {
    console.log(index);
  }

  return (
    <>
      <NavBar page="Wishlist" />
      {userID === "" ?
        <UserNotLogin />
        :
        <>
          <Box>
            <Box margin={"20px 10px 10px 20px"} >
              <span style={{ cursor: "pointer", fontSize: '30px' }} onClick={() => { navigate("/") }} className="material-symbols-outlined">
                arrow_back
              </span>
            </Box>
            {
              AllWishListProduct.length === 0 ?
                <>
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    height="50vh"
                    color="gray.600"
                  >
                    <Text fontSize="2xl" mb={4}>
                      Oops! Your wishlist is empty!
                    </Text>
                    <Text fontSize="lg" textAlign="center" mb={4}>
                      Looks like you haven't added anything to your wishlist yet. <br />
                      Start exploring our amazing products and add them to your wishlist!
                    </Text>
                    <Button size="lg" mt={4} onClick={() => { navigate("/") }} >
                      Start Shopping
                    </Button>
                  </Flex>
                </>
                :
                <Box padding={"20px 30px"} display={'flex'} gap={"30px"} alignItems={'center'} flexWrap={'wrap'} >
                  {
                    AllWishListProduct.map((product, i) => {
                      return (
                        <SingleCard
                          key={i}
                          productDetails={product}
                          removeFromWishList={() => {
                            const arr = AllWishListProduct.filter((pro, index) => index !== i);
                            SetAllWishListProduct(arr);
                          }}
                        />

                      )
                    })
                  }
                </Box>

            }
          </Box>
        </>
      }
    </>
  )
}