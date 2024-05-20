import { Box, Button, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import RatingStar from './RatingStar'
import { FaHeart } from "react-icons/fa"

export const SingleCard = ({ productDetails, newProduct, removeFromWishList }) => {
    const { Images, title, newPrice, oldPrice, _id, rating } = productDetails
    const toast = useToast();
    const [Loading, SetLoading] = useState(false);
    const [Rating, SteRating] = useState(0);
    const [CheckWishList, SetCheckWishList] = useState(false);

    useEffect(() => {

        const checkForWishList = async () => {
            const { data } = await axios.get(`http://localhost:3000/api/checkWishList?productID=${_id}&userID=${localStorage.getItem("ShopZa")}`);
            SetCheckWishList(data);
        }

        checkForWishList();
        var sum = 0;
        Object.values(rating).forEach(rate => {
            sum += rate
        })
        sum = sum / Object.values(rating).length
        SteRating(sum / 3);
    }, [])

    const handleWishList = async () => {
        if (localStorage.getItem("ShopZa")) {
            SetLoading(true);
            const { data } = await axios.post("http://localhost:3000/api/addRemoveWishlist", {
                userID: localStorage.getItem("ShopZa"),
                productID: _id
            })
            if (data.wishlist) {
                toast({
                    title: `${data.msg}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                SetCheckWishList(pre => !pre)
            }
            else {
                toast({
                    title: `${data.msg}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                if (removeFromWishList) {
                    removeFromWishList();
                }
                else {
                    SetCheckWishList(pre => !pre)
                }
            }
            SetLoading(false);
        }
        else {
            toast({
                title: 'To add item Login first',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Box className='Container' >
                <Link to={`/product/${_id}`} >
                    <Box className='image_container' display={'flex'} alignItems={'center'} justifyContent={'center'} >
                        <Image className='image' src={Images[0]} />
                    </Box>
                </Link>
                <Box height={"180px"} display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={"15px"} >
                    <Link to={`/product/${_id}`} >
                        <Box width={"80%"} overflow={'hidden'} >
                            <Text fontSize={"1em"} opacity={0.6} width={'fit-content'} >
                                {title}
                            </Text>
                            <Text>
                                <RatingStar rating={Rating} />
                            </Text>
                            <Box display={'flex'} alignItems={'center'} gap={"10px"} width={'max-content'} >
                                <Text display={'flex'} alignItems={'center'} >
                                    <span className="material-symbols-outlined" style={{ scale: "0.8" }} >
                                        currency_rupee
                                    </span>{newPrice}
                                </Text>
                                <Text fontSize={'smaller'} display={'flex'} gap={"0px"} p={0} m={0} alignItems={'center'} textDecoration={'line-through'} opacity={0.6} >
                                    <span className="material-symbols-outlined" style={{ scale: "0.7" }} >
                                        currency_rupee
                                    </span>{oldPrice}
                                </Text>
                            </Box>
                        </Box>
                    </Link>
                    <Box width={"20%"} >
                        <Button isLoading={Loading} onClick={handleWishList} variant={'ghost'} borderRadius={"50%"} height={"50px"} width={"50px"} >
                            <span className="material-symbols-outlined">
                                {CheckWishList ?
                                    <FaHeart style={{ color: "rgb(255, 100, 100)" }} />
                                    :
                                    "favorite"
                                }
                            </span>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}